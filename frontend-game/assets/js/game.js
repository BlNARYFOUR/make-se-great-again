class Game {
    // every X, Y, width and height value needs to be stored as value in from 0 to 1
    constructor(speed, gravity, birdX, birdY, birdSize, groundY) {
        this.speed = 0.00001 * speed;
        this.speedBuf = this.speed;
            this.groundX = 0;
        this.gravity = 0.00001 * gravity;
        this.tubes = new Array(0);
        this.bird = new Bird(birdX, birdY, birdSize);
        this.groundY = groundY;
        this.score = 0;
        this.enabled = false;
        this.level = 1;
        this.gameOver = false;
        this.forceOnGameOver = 0;
    }

    getBirdSize() {
        return this.bird.size;
    }

    getBirdY() {
        return this.bird.y;
    }

    static getForceMultiplier() {
        return 320;
    }

    static getIdleFlyTime() {
        return Game.getForceMultiplier() * 31/16;
    }

    applyBirdFlying() {
        this.bird.force = - Game.getForceMultiplier() * this.gravity;
    }

    update(passedTime) {
        this.updateBird(passedTime);
        this.updateGroundX(passedTime);
        this.updateTubes(passedTime);
    }

    updateBird(passedTime) {
        this.bird.force += this.gravity * passedTime;
        this.bird.y += this.bird.force;
        if(!this.isBirdAboveGround()) {
            this.bird.y = this.groundY + 0.01 - this.bird.height - Game.getRotateTransform(this.getBirdAngle(), this.bird.size, this.bird.height);
            this.bird.force = 0;
            this.speed = 0;
            this.gameOver = true;
        } else {
            this.forceOnGameOver = this.bird.force;
            console.log("gets here")
        }

        if(this.didBirdCollide()) {
            this.bird.x += 0.006;
            this.speed = 0;
            this.gravity *= 1.1;
            this.gameOver = true;
        }
    }

    isBirdAboveGround() {
        return this.bird.y - Game.getRotateTransform(this.getBirdAngle(), this.bird.size, this.bird.height) < this.groundY - this.bird.height - Game.getRotateTransform(this.getBirdAngle(), this.bird.size, this.bird.height) * 2 ;
    }

    getBirdAngle() {
        return this.gameOver ? Math.atan(this.forceOnGameOver / (this.speedBuf * 20)) : (this.speed === 0 ? Math.atan(this.bird.force / (this.speedBuf * 20)) : Math.atan(this.bird.force / (this.speed * 20))); //Math.PI * 0.5;
    }

    didBirdCollide() {
        let rotateTransform = Game.getRotateTransform(this.getBirdAngle(), this.bird.size, this.bird.height);

        let birdX1 = this.bird.x + rotateTransform;
        let birdY1 = this.bird.y - rotateTransform;
        let birdX2 = this.bird.x + this.bird.size - rotateTransform;
        let birdY2 = this.bird.y + this.bird.height + rotateTransform;

        for(let i = 0; i < this.tubes.length; i++) {
            let tubeX1 = this.tubes[i].x;
            let tubeY1 = this.tubes[i].isTopOrientation ? 0 : this.tubes[i].y;
            let tubeX2 = this.tubes[i].x + this.tubes[i].size;
            let tubeY2 = this.tubes[i].isTopOrientation ? this.tubes[i].y : this.groundY;

            if(
                (tubeX1 <= birdX2)
                && (birdX1 <= tubeX2)
                && (((tubeY1 <= birdY2)
                && (birdY1 <= tubeY2))
                    || birdY2 <= 0)
            ) {
                return true;
            }
        }
        return false;
    }

    static getRotateTransform(angle, width, height) {
        return (1-Math.cos(angle)) * (width * 0.5 - height * 0.5);
    }

    updateGroundX(passedTime) {
        this.groundX -= passedTime * this.speed;
    }

    updateTubes(passedTime) {
        for(let i=this.tubes.length-1; 0 <= i; i--) {
            this.tubes[i].x -= passedTime * this.speed;

            if(this.tubes[i].x < (-this.tubes[i].size)) {
                this.tubes.splice(i, 1);
            } else if((this.tubes[i].x + this.tubes[i].size * 0.5) < (this.bird.x + this.bird.size * 0.5) && !this.tubes[i].hasScored && !this.gameOver) {
                this.score += 0.5;
                this.tubes[i].hasScored = true;
                this.level += 1;
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