"use strict";

document.addEventListener("DOMContentLoaded", init);

let game = null;

let opacity = 1;

const speed = 4;
const gravity = 2.5;
const birdSize = 0.0865;
const groundY = 0.815;
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

    ui.drawOverlay(canvas, "black", 1 / (150 / passedTime));

    if(1 <= opacity) {
        game = new Game(speed, gravity, birdBeginY, birdSize, groundY);
        opacity = 1;
        requestAnimationFrame(() => gameLoop(canvas, new Date().getTime(), 500, 0));
    } else {
        requestAnimationFrame(() => beginOverlayLoop(canvas, time, opacity));
    }
}

function gameLoop(canvas, prevTime, passedFlyTime, prevGroundX) {

    const time = new Date().getTime();
    const passedTime = time - prevTime;

    game.update(passedTime);

    if(game.enabled) {
        let groundDiff = prevGroundX - game.getGroundX();
        if(0.8 / game.level < groundDiff) {
            const thickerPart = 0.075;
            const spaceBetween = 0.05 + 0.1 / (game.level * 0.25 + 0.25);
            let height = thickerPart + Math.random() * (game.getGroundY() - thickerPart * 2 - spaceBetween);
            game.spawnTube(height, true, 0.137);
            game.spawnTube(height + spaceBetween, false, 0.137);
            prevGroundX = game.getGroundX();
        }
    } else if(620 < passedFlyTime) {
        game.applyBirdFlying(passedTime);
        passedFlyTime = 0;
        ui.startBirdAnimation();
    }

    opacity -= 1 / (160 / passedTime);
    opacity = opacity < 0 ? 0 : opacity;

    doUiStuff(canvas, opacity, game.enabled);

    passedFlyTime += passedTime;

    if(!game.enabled) {
        ui.drawOverlay(canvas, "black", opacity);
    }

    requestAnimationFrame(() => gameLoop(canvas, time, passedFlyTime, prevGroundX));
}

function doUiStuff(canvas, opacity, gameActivated) {
    opacity = gameActivated ? opacity : 1;

    ui.resizeCanvas(canvas);
    ui.drawBasicStaticBackground(canvas, game.getGroundY());
    ui.drawGround(canvas, canvas.width * game.getGroundX(), game.getGroundY());
    ui.drawTubes(canvas, game.getTubes(), groundY);
    ui.drawScore(canvas, 0);
    ui.drawTitle(canvas, ui.components.readyScreen.title, opacity);
    ui.drawBird(canvas, game.getBirdY(), game.getBirdSize());
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
        } else if(game !== null) {
            game.enabled = true;
            game.applyBirdFlying();
            ui.startBirdAnimation();
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

    if((game !== null) && (e.code === "Space")) {
        if(!game.enabled) {
            game.enabled = true;
            opacity = 1;
        }
        game.applyBirdFlying();
        ui.startBirdAnimation();
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

