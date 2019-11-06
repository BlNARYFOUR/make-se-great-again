class Game {
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
        this.groundX += passedTime * this.speed;
    }

    updateTubes(passedTime) {

    }

    getGroundX() {
        return this.groundX;
    }
}