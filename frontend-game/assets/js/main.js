"use strict";

document.addEventListener("DOMContentLoaded", init);

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
            activateButtonEvents(canvas, buttons);
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
        requestAnimationFrame(() => getReadyLoop(canvas, new Date().getTime(), new Game(speed, gravity, birdBeginY, birdSize, groundY), 1, 500));
    } else {
        requestAnimationFrame(() => beginOverlayLoop(canvas, time, opacity));
    }
}

function getReadyLoop(canvas, prevTime, game, opacity, passedFlyTime) {
    const time = new Date().getTime();
    const passedTime = time - prevTime;

    opacity -= 1 / (150 / passedTime);
    opacity = opacity < 0 ? 0 : opacity;
    game.update(passedTime);

    ui.resizeCanvas(canvas);
    ui.drawBasicStaticBackground(canvas, game.getGroundY());
    ui.drawGround(canvas, canvas.width * game.getGroundX(), game.getGroundY());
    ui.drawTubes(canvas, game.getTubes(), groundY);
    ui.drawScore(canvas, 0);
    ui.drawTitle(canvas, ui.components.readyScreen.title);
    ui.drawBird(canvas, game.getBirdY(), game.getBirdSize());
    ui.drawBirdControlHint(canvas, game.getBirdSize(), 1);
    ui.drawBorder(canvas);

    passedFlyTime += passedTime;

    if(645 < passedFlyTime) {
        game.applyBirdFlying(passedTime);
        passedFlyTime = 0;
        ui.startBirdAnimation();
    }

    ui.drawOverlay(canvas, "black", opacity);

    requestAnimationFrame(() => getReadyLoop(canvas, time, game, opacity, passedFlyTime));
}

function gameLoop(canvas, score, prevTime) {

    console.log(prevTime);

    requestAnimationFrame(() => gameLoop(canvas, score, new Date().getTime()));
}

function activateButtonEvents(canvas, buttons) {
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

        buttons.forEach((button) => {
            if(ui.checkButtonBounds(canvas, button.component, mouseX, mouseY) && button.component.enabled) {
                button.action(canvas);
            }
        });
    });
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

