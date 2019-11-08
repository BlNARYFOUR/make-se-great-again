"use strict";

document.addEventListener("DOMContentLoaded", init);

let game = null;

let opacity = 1.0;
let flash = 1.0;

const speed = 4;
const gravity = 3;
const birdSize = 0.0865;
const groundY = 0.815;
const birdBeginX = 0.31;
const birdBeginY = (groundY - 0.015) * 0.5;

function init(e) {
    const canvas = document.querySelector('#gameEnv');

    const buttons = [
        {
            "component": ui.components.startScreen.playButton,
            "action": startTheGame
        },
    ];

    const loads = {
        fontRegular: new FontFace('Flappy Regular', 'url(assets/fonts/Flappy-Regular.ttf)'),
        fontTitle: new FontFace('Flappy Title', 'url(assets/fonts/Flappy-Title.ttf)'),
        fontBetter: new FontFace('Flappy Better', 'url(assets/fonts/Flappy-Better.ttf)'),
        skyscrapers: createImageObj("bg-distance.png"),
        bird_0: createImageObj("bird_00.png"),
        bird_1: createImageObj("bird_01.png"),
        bird_2: createImageObj("bird_02.png"),
        birdHint: createImageObj("hint.png")
    };

    preLoaderAndDrawBeginScreen(loads, canvas, buttons);
}

function createImageObj(fileName) {
    let img = new Image();
    img.src = "assets/media/" + fileName;
    return img;
}

function preLoaderAndDrawBeginScreen(loads, canvas, buttons) {
    let loaded = Object.values(loads).length;

    function onLoad(e) {
        loaded--;
        if (loaded === 0) {
            ui.setLoads(loads);
            ui.drawStartScreen(canvas, getHighScores(), groundY);
            ui.enableStartButton();
            activateInputEvents(canvas, buttons);
        }
    }

    for (let i = 0; i < Object.values(loads).length; i++) {
        if(Object.values(loads)[i].load) {
            Object.values(loads)[i].load().then(onLoad);
        } else {
            Object.values(loads)[i].addEventListener("load", onLoad);
        }
    }
}

function startTheGame(canvas, highScores) {
    ui.disableStartButton();
    document.body.style.cursor = "default";

    requestAnimationFrame(() => beginOverlayLoop(canvas, new Date().getTime(), 0));
}

function beginOverlayLoop(canvas, prevTime, opacity) {
    const time = new Date().getTime();
    const passedTime = time - prevTime;

    opacity += 1 / (100 / passedTime);

    ui.drawOverlay(canvas, "black", 1 / (200 / passedTime));

    if(1 <= opacity) {
        game = new Game(speed, gravity, birdBeginX, birdBeginY, birdSize, groundY);
        opacity = 1.0;
        flash = 1.0;
        requestAnimationFrame(() => gameLoop(canvas, new Date().getTime(), 500, 0));
    } else {
        requestAnimationFrame(() => beginOverlayLoop(canvas, time, opacity));
    }
}

function gameLoop(canvas, prevTime, passedTimeAnimation, prevGroundX) {

    const time = new Date().getTime();
    const passedTime = time - prevTime;

    game.update(passedTime);

    if(game.enabled) {
        const width = 0.136 + 0.1 * (game.level * 0.001);
        let groundDiff = prevGroundX - game.getGroundX();
        if(width*1.5 + (0.5 / (game.level * 0.01 + 0.99)) < groundDiff) {

            const minHeight = 0.075;
            const spaceBetween = 0.125 + 0.1 / (game.level * 0.001 + 0.999);
            let height = minHeight + Math.random() * (game.getGroundY() - minHeight * 2 - spaceBetween);
            game.spawnTube(height, true, width);
            game.spawnTube(height + spaceBetween, false, width);
            prevGroundX = game.getGroundX();
        }
    } else if(Game.getIdleFlyTime() < passedTimeAnimation && !game.gameOver) {
        game.applyBirdFlying(passedTime);
        passedTimeAnimation = 0;
        ui.startBirdAnimation();
    }

    opacity -= 1 / (200 / passedTime);
    opacity = opacity < 0 ? 0 : opacity;

    doUiStuff(canvas, opacity, game.enabled);

    passedTimeAnimation += passedTime;

    if(!game.enabled) {
        ui.drawOverlay(canvas, "black", opacity);
    }

    if(game.gameOver) {
        ui.drawOverlay(canvas, "white", flash);
        if(flash === 1) {
            passedTimeAnimation = new Date().getTime();
        }

        flash -= 1 / (250 / passedTime);
        flash = flash < 0 ? 0 : flash;

        if(game.getGroundY() <= (game.getBirdY() + game.bird.height) && game.speed === 0 ) {
            console.log("GAME OVER");
            opacity = 0;
            requestAnimationFrame(() => gameOverLoop(canvas, passedTimeAnimation, flash));
            return;
        }
    }

    requestAnimationFrame(() => gameLoop(canvas, time, passedTimeAnimation, prevGroundX));
}

function gameOverLoop(canvas, prevTime, flashContinue, animationStarted = false) {
    const time = new Date().getTime();
    const passedTime = time - prevTime;
    let timeToPass = time;

    ui.resizeCanvas(canvas);
    ui.drawBasicStaticBackground(canvas, game.getGroundY());
    ui.drawTubes(canvas, game.getTubes(), groundY);
    ui.drawBird(canvas, birdBeginX, game.getBirdY(), game.getBirdSize());
    ui.drawGround(canvas, canvas.width * game.getGroundX(), game.getGroundY());
    ui.drawBorder(canvas);
    ui.drawOverlay(canvas, "white", flashContinue);

    flashContinue -= 1 / (250 / passedTime);
    flashContinue = flashContinue < 0 ? 0 : flashContinue;

    if(passedTime < 500 && !animationStarted) {
        timeToPass = prevTime;
        ui.drawScore(canvas, game.score);
        ui.components.gameOverScreen.title.topToHave = ui.components.gameOverScreen.title.top;
    } else if(!animationStarted) {
        animationStarted = true;
    } else {
        ui.drawTitle(canvas, ui.components.gameOverScreen.title, opacity);
        opacity += 1 / (500 / passedTime);
    }

    requestAnimationFrame(() => gameOverLoop(canvas, timeToPass, flashContinue, animationStarted));
}

function doUiStuff(canvas, opacity, gameActivated) {
    opacity = gameActivated ? opacity : 1;

    ui.resizeCanvas(canvas);
    ui.drawBasicStaticBackground(canvas, game.getGroundY());
    ui.drawTubes(canvas, game.getTubes(), groundY);
    ui.drawScore(canvas, game.score);
    ui.drawTitle(canvas, ui.components.readyScreen.title, opacity);
    ui.drawBird(canvas, birdBeginX, game.getBirdY(), game.getBirdSize());
    ui.drawGround(canvas, canvas.width * game.getGroundX(), game.getGroundY());
    ui.drawBirdControlHint(canvas, game.getBirdSize(), opacity);
    ui.drawBorder(canvas);
}

function activateInputEvents(canvas, buttons) {
    canvas.addEventListener("mousemove", (e) => {
        let mouseX = (e.pageX - canvas.offsetLeft) * 2;
        let mouseY = (e.pageY - canvas.offsetTop) * 2;

        let isHoveringOverButton = false;

        buttons.forEach((button) => {
            if(ui.checkButtonBounds(canvas, button.component, mouseX, mouseY) && button.component.enabled) {
                isHoveringOverButton = true;
            }
        });

        if(isHoveringOverButton) {
            document.body.style.cursor = "pointer";
        } else {
            document.body.style.cursor = "default";
        }
    });

    canvas.addEventListener("click", (e) => {
        let mouseX = (e.pageX - canvas.offsetLeft)* 2;
        let mouseY = (e.pageY - canvas.offsetTop) * 2;

        let action = null;

        buttons.forEach((button) => {
            if(ui.checkButtonBounds(canvas, button.component, mouseX, mouseY) && button.component.enabled) {
                action = button.action;
            }
        });

        if(action !== null) {
            action(canvas);
        } else if(game !== null && !game.gameOver) {
            game.enabled = true;
            game.applyBirdFlying();
            ui.startBirdAnimation();
        } else {
            ui.components.gameScreen.bird.isFlying = false;
            ui.components.gameScreen.bird.wingState = 2;
            ui.components.gameScreen.bird.wingFlapCount = 10;
        }
    });

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", (e) => {
        e.stopPropagation();
        document.addEventListener("keydown", onKeyDown);
    });
}

function onKeyDown(e) {
    e.stopPropagation();
    document.removeEventListener("keydown", onKeyDown);

    if(game !== null && !game.gameOver && e.code === "Space") {
        if(!game.enabled) {
            game.enabled = true;
            opacity = 1;
        }
        game.applyBirdFlying();
        ui.startBirdAnimation();
    } else {
        ui.components.gameScreen.bird.isFlying = false;
        ui.components.gameScreen.bird.wingState = 2;
        ui.components.gameScreen.bird.wingFlapCount = 10;
    }
}

function getHighScores() {
    function HighScore(name, score) {
        this.name = name;
        this.score = score;
    }

    return [
        new HighScore("Why is this username so long like wtf just why", 1098),
        new HighScore("Bob", 76),
        new HighScore("Maria", 54),
        new HighScore("Jane", 32),
        new HighScore("Jesus", 10),
    ];
}

