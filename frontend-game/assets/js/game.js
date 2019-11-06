class Game {
    // every X, Y, width and height value needs to be stored as value in from 0 to 1
    constructor(speed) {
        this.speed = speed;
        this.groundX = 0;
        this.tubes = new Array(0);
    }

    update(passedTime) {
        this.updateGroundX(passedTime);
        this.updateTubes(passedTime);
    }

    updateGroundX(passedTime) {
        this.groundX -= passedTime * this.speed;
    }

    updateTubes(passedTime) {
        for(let i=this.tubes.length-1; 0 <= i; i--) {
            this.tubes[i].x -= passedTime * this.speed;

            if(this.tubes[i].x < (-0.125)) {
                this.tubes.splice(i);
            }
        }
    }

    spawnTube(height, isTopOrientation) {
        this.tubes.push(new Tube(height, isTopOrientation));
    }

    getTubes() {
        return this.tubes;
    }

    getGroundX() {
        return this.groundX;
    }
}

function Tube(y, isTopOrientation) {
    this.y = y;
    this.isTopOrientation = isTopOrientation;
    this.x = 1;
}