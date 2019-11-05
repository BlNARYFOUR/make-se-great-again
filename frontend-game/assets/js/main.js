"use strict";

document.addEventListener("DOMContentLoaded", init);

function init(e) {
    const canvas = document.querySelector('#gameEnv');

    const buttons = [
        {
            "component": ui.components.startScreen.components.playButton,
            "action": startTheGame
        },
    ];

    const loads = {
        fontRegular: new FontFace('Flappy Regular', 'url(assets/fonts/Flappy-Regular.ttf)'),
        fontTitle: new FontFace('Flappy Title', 'url(assets/fonts/Flappy-Title.ttf)'),
        fontBetter: new FontFace('Flappy Better', 'url(assets/fonts/Flappy-Better.ttf)')
    };

    preLoaderAndDrawBeginScreen(loads, canvas, buttons);
}

function preLoaderAndDrawBeginScreen(loads, canvas, buttons) {
    let loaded = Object.values(loads).length;

    for (let i = 0; i < Object.values(loads).length; i++) {
        console.log(Object.values(loads)[i]);
        Object.values(loads)[i].load().then(function(loadedObj) {
            console.log("loaded:", loadedObj);
            loaded--;
            if (loaded === 0) {
                ui.drawStartScreen(canvas, getHighScores());
                ui.enableStartButton();
                activateButtonEvents(canvas, buttons);
            }
        });
    }
}

function startTheGame(canvas) {
    console.log("GAME STARTED");
}

function activateButtonEvents(canvas, buttons) {
    canvas.addEventListener("mousemove", (e) => {
        let mouseX = e.pageX - canvas.offsetLeft;
        let mouseY = e.pageY - canvas.offsetTop;

        let isHoveringOverButton = false;

        buttons.forEach((button) => {
            if(ui.checkButtonBounds(canvas, button.component, mouseX, mouseY) && button.component.attributes.enabled) {
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
        let mouseX = e.pageX - canvas.offsetLeft;
        let mouseY = e.pageY - canvas.offsetTop;

        buttons.forEach((button) => {
            if(ui.checkButtonBounds(canvas, button.component, mouseX, mouseY) && button.component.attributes.enabled) {
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
        new HighScore("Jesus", 999999),
        new HighScore("Bob", 99),
        new HighScore("Maria", 87),
        new HighScore("Jane", 69),
        new HighScore("Why is this username so long like wtf just why", 47),
    ];
}

