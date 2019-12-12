"use strict";

document.addEventListener("DOMContentLoaded", init);

let game = null;

let retry = false;
let saveScore = false;

let offset = 0;
let offset2 = 0;
let opacity = 0;
let flash = 1.0;

let highScores = [];
let scoresUpdated = false;

const speed = 40;
const gravity = 3.5;
const birdSize = 0.0865;
const groundY = 0.815;
const birdBeginX = 0.31;
const birdBeginY = (groundY - 0.015) * 0.5;

const loads = {
    fontRegular: new FontFace('Flappy Regular', 'url(assets/fonts/Flappy-Regular.ttf)'),
    fontTitle: new FontFace('Flappy Title', 'url(assets/fonts/Flappy-Title.ttf)'),
    fontBetter: new FontFace('Flappy Better', 'url(assets/fonts/Flappy-Better.ttf)'),
    skyscrapers: createImageObj("bg-distance.png"),
    bird_0: createImageObj("bird_00.png"),
    bird_1: createImageObj("bird_01.png"),
    bird_2: createImageObj("bird_02.png"),
    bird_3: createImageObj("bird_01.png"),
    birdHint: createImageObj("hint.png")
};

function init(e) {
    const canvas = document.querySelector('#gameEnv');

    const buttons = [
        {
            component: ui.components.startScreen.playButton,
            action: startTheGame
        },
        {
            component: ui.components.gameOverScreen.submitScoreButton,
            action: saveHighScore
        },
        {
            component: ui.components.gameOverScreen.restartButton,
            action: startTheGame
        }
    ];

    document.querySelector("#formName").addEventListener("submit", (e) => submitNameForm(e, canvas));
    scores.getHighScoreList((data) => {showHighScores(data.data, canvas);});
    preLoaderAndDrawBeginScreen(loads, canvas, buttons);
}

function submitNameForm(e, canvas) {
    e.preventDefault();
    saveHighScore(canvas);
}

function createImageObj(fileName) {
    let img = new Image();
    img.src = "assets/media/" + fileName;
    return img;
}

function showHighScores(highScoreList, canvas) {
    fillHighScores(highScoreList);
    if (opacity <= 0 && (game === null || (game !== null && !game.enabled))) {
        drawBeginScreen(canvas, highScores);
    }
}

function fillHighScores(highScoreList) {
    highScores = highScoreList.slice(0,5);

    while(highScores.length < 5) {
        highScores.push({name: "-", score: "xxx"});
    }
}

function drawBeginScreen(canvas, highScoreList = getEmptyHighScores()) {
    ui.drawStartScreen(canvas, highScoreList, groundY);
    ui.enableStartButton();
}

function preLoaderAndDrawBeginScreen(loads, canvas, buttons) {
    let loaded = Object.values(loads).length;

    function onLoad(e) {
        loaded--;
        if (loaded === 0) {

            ui.setLoads(loads);
            drawBeginScreen(canvas);
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

function startTheGame(canvas) {
    retry = true;
    ui.disableStartButton();
    document.querySelector("#userName").classList.remove("active");

    document.body.style.cursor = "default";

    requestAnimationFrame(() => beginOverlayLoop(canvas, new Date().getTime(), 0));
}

function saveHighScore(canvas) {
    saveScore = true;

    scores.saveScore(game.score, (data) => scores.getHighScoreList((d) => showHighScores(d.data, canvas)));

    document.querySelector("#userName").classList.remove("active");

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
        if(saveScore) {
            requestAnimationFrame(() => startScreenLoop(canvas, new Date().getTime()));
        }else {
            requestAnimationFrame(() => gameLoop(canvas, new Date().getTime(), 500, 0));
        }
    } else {
        requestAnimationFrame(() => beginOverlayLoop(canvas, time, opacity));
    }
}

function startScreenLoop(canvas, prevTime) {
    const time = new Date().getTime();
    const passedTime = time - prevTime;

    opacity -= 1 / (200 / passedTime);
    opacity = opacity < 0 ? 0 : opacity;

    ui.drawStartScreen(canvas, highScores, groundY);
    ui.drawOverlay(canvas, "black", opacity);

    if(0 < opacity) {
        requestAnimationFrame(() => startScreenLoop(canvas, time));
    } else {
        saveScore = false;
        ui.enableStartButton();
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

    doGameUiStuff(canvas, opacity, game.enabled);

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

        if(game.getGroundY() <= (game.getBirdY() + game.bird.height + Game.getRotateTransform(game.getBirdAngle(), game.bird.size, game.bird.height)) && game.speed === 0 ) {
            opacity = 0;
            retry = false;
            saveScore = false;
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
    ui.drawBird(canvas, birdBeginX, game.getBirdY(), game.getBirdSize(), game.getBirdAngle(), game.gameOver);
    ui.drawGround(canvas, canvas.width * game.getGroundX(), game.getGroundY());
    ui.drawBorder(canvas);
    ui.drawOverlay(canvas, "white", flashContinue);

    flashContinue -= 1 / (250 / passedTime);
    flashContinue = flashContinue < 0 ? 0 : flashContinue;

    if(passedTime < 500 && !animationStarted) {
        timeToPass = prevTime;
        ui.drawScore(canvas, game.score);
    } else if(!animationStarted) {
        opacity = 0;
        offset = 0.5;
        offset2 = -0.15;
        animationStarted = true;
        document.querySelector("#userName").classList.add("active");
    } else {
        ui.drawGameOverPane(canvas, game.score, opacity);
        ui.drawButton(canvas, ui.components.gameOverScreen.submitScoreButton, offset);
        ui.drawButton(canvas, ui.components.gameOverScreen.restartButton, offset);
        ui.drawTitle(canvas, ui.components.gameOverScreen.title, opacity, offset2);

        opacity += 1 / (250 / passedTime);
        opacity = 1 < opacity ? 1 : opacity;
        offset -= 0.5 / (500 / passedTime);
        offset = offset < 0 ? 0 : offset;
        offset2 += 0.15 / (500 / passedTime);
        offset2 = 0 < offset2 ? 0 : offset2;

        if(offset === 0) {
            ui.enableSaveScoreButton();
            ui.enableRetryButton();
        }
    }

    if(!retry && !saveScore) {
        requestAnimationFrame(() => gameOverLoop(canvas, timeToPass, flashContinue, animationStarted));
    } else {
        ui.disableSaveScoreButton();
        ui.disableRetryButton();
    }
}

function doGameUiStuff(canvas, opacity, gameActivated) {
    opacity = gameActivated ? opacity : 1;

    ui.resizeCanvas(canvas);
    ui.drawBasicStaticBackground(canvas, game.getGroundY());
    ui.drawTubes(canvas, game.getTubes(), groundY);
    ui.drawScore(canvas, game.score);
    ui.drawTitle(canvas, ui.components.readyScreen.title, opacity);
    ui.drawBird(canvas, birdBeginX, game.getBirdY(), game.getBirdSize(), game.getBirdAngle(), game.gameOver);
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
        }
    });

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", (e) => {
        e.stopPropagation();
        document.addEventListener("keydown", onKeyDown);
    });
}

function onKeyDown(e) {
    document.removeEventListener("keydown", onKeyDown);

    if(game !== null && !game.gameOver) {
        if(e.code === "Space") {
            if(!game.enabled) {
                game.enabled = true;
                opacity = 1;
            }

            ui.startBirdAnimation();
            game.applyBirdFlying();
        }
    }
}

function getEmptyHighScores() {
    function HighScore(name, score) {
        this.name = name;
        this.score = score;
    }

    return [
        new HighScore("-", "xxx"),
        new HighScore("-", "xxx"),
        new HighScore("-", "xxx"),
        new HighScore("-", "xxx"),
        new HighScore("-", "xxx"),
    ];
}

