class Game {
    // every X, Y, width and height value needs to be stored as value in from 0 to 1
    constructor(speed, gravity, birdX, birdY, birdSize, groundY) {
        this.speed = 0.0001 * speed;
        this.groundX = 0;
        this.gravity = 0.00001 * gravity;
        this.tubes = new Array(0);
        this.bird = new Bird(birdX, birdY, birdSize);
        this.groundY = groundY;
        this.score = 0;
        this.enabled = false;
        this.level = 1;
        this.gameOver = false;
    }

    getBirdSize() {
        return this.bird.size;
    }

    getBirdY() {
        return this.bird.y;
    }

    applyBirdFlying() {
        this.bird.force = - 20 * this.gravity * 16;
    }

    update(passedTime) {
        this.updateBird(passedTime);
        this.updateGroundX(passedTime);
        this.updateTubes(passedTime);
    }

    updateBird(passedTime) {
        if(this.isBirdAboveGround()) {
            this.bird.force += this.gravity * passedTime;
            this.bird.y += this.bird.force;
        } else {
            this.bird.y = this.groundY + 0.005 - this.bird.height;
            this.bird.force = 0;
            this.speed = 0;
            this.gameOver = true;
        }

        if(this.didBirdCollide()) {
            this.speed = 0;
            this.gravity *= 1.125;
            this.gameOver = true;
        }
    }

    isBirdAboveGround() {
        return this.bird.y < this.groundY - this.bird.size * this.bird.sizeRatio;
    }

    didBirdCollide() {
        for(let i = 0; i < this.tubes.length; i++) {
            let birdX1 = this.bird.x;
            let birdY1 = this.bird.y;
            let birdX2 = this.bird.x + this.bird.size;
            let birdY2 = this.bird.y + this.bird.height;
            let tubeX1 = this.tubes[i].x;
            let tubeY1 = this.tubes[i].isTopOrientation ? 0 : this.tubes[i].y;
            let tubeX2 = this.tubes[i].x + this.tubes[i].size;
            let tubeY2 = this.tubes[i].isTopOrientation ? this.tubes[i].y : this.groundY;

            console.log("TUBE_1", tubeX1 + " " + tubeY1);
            console.log("TUBE_2", tubeX2 + " " + tubeY2);
            console.log("BIRD_1", birdX1 + " " + birdY1);
            console.log("BIRD_2", birdX2 + " " + birdY2);

            if(
                (tubeX1 <= birdX2)
                && (birdX1 <= tubeX2)
                && (tubeY1 <= birdY2)
                && (birdY1 <= tubeY2)
            ) {
                return true;
            }
        }
        return false;
    }

    updateGroundX(passedTime) {
        this.groundX -= passedTime * this.speed;
    }

    updateTubes(passedTime) {
        for(let i=this.tubes.length-1; 0 <= i; i--) {
            this.tubes[i].x -= passedTime * this.speed;

            if(this.tubes[i].x < (-this.tubes[i].size)) {
                this.tubes.splice(i, 1);
            } else if((this.tubes[i].x + this.tubes[i].size * 0.5) < (this.bird.x + this.bird.size * 0.5) && !this.tubes[i].hasScored) {
                this.score += 0.5;
                this.tubes[i].hasScored = true;
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

function Bird(x, y, size) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.force = 0;
    this.sizeRatio = 12 / 17;
    this.height = this.size * this.sizeRatio;
}

function Tube(y, isTopOrientation, size) {
    this.size = size;
    this.y = y;
    this.isTopOrientation = isTopOrientation;
    this.x = 1;
    this.hasScored = false;
}