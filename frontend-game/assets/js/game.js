class Game {
    // every X, Y, width and height value needs to be stored as value in from 0 to 1
    constructor(speed, gravity, birdY, birdSize, groundY) {
        this.speed = 0.0001 * speed;
        this.groundX = 0;
        this.gravity = 0.00001 * gravity;
        this.tubes = new Array(0);
        this.bird = new Bird(birdY, birdSize);
        this.groundY = groundY;
    }

    getBirdSize() {
        return this.bird.size;
    }

    getBirdY() {
        return this.bird.y;
    }

    applyBirdFlying(passedTime) {
        this.bird.force = - 20 * this.gravity * passedTime;
    }

    update(passedTime) {
        this.updateBird(passedTime);
        this.updateGroundX(passedTime);
        this.updateTubes(passedTime);
    }

    updateBird(passedTime) {
        if(this.bird.y < this.groundY - this.bird.size * this.bird.sizeRatio) {
            this.bird.force += this.gravity * passedTime;
            this.bird.y += this.bird.force;
        } else {
            this.bird.force = 0;
        }
    }

    updateGroundX(passedTime) {
        this.groundX -= passedTime * this.speed;
    }

    updateTubes(passedTime) {
        for(let i=this.tubes.length-1; 0 <= i; i--) {
            this.tubes[i].x -= passedTime * this.speed;

            if(this.tubes[i].x < (-this.tubes[i].size)) {
                this.tubes.splice(i);
            }
        }
    }

    spawnTube(height, isTopOrientation, size) {
        this.tubes.push(new Tube(height, isTopOrientation, size));
    }

    getTubes() {
        return this.tubes;
    }

    getGroundX() {
        return this.groundX;
    }

    getGroundY() {
        return this.groundY;
    }
}

function Bird(y, size) {
    this.size = size;
    this.y = y;
    this.force = 0;
    this.sizeRatio = 12 / 17;
}

function Tube(y, isTopOrientation, size) {
    this.size = size;
    this.y = y;
    this.isTopOrientation = isTopOrientation;
    this.x = 1;
}