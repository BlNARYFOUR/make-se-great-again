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

    ui.drawStartScreen(canvas, getHighScores());
    ui.enableStartButton();
    activateButtonEvents(canvas, buttons);
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
        new HighScore("Barbara", 50),
        new HighScore("Why is this username so long like wtf just why", 47),
        new HighScore("Alice", 42),
        new HighScore("John Doe", 25),
        new HighScore("Joseph", 5),
        new HighScore("A", 1)
    ];
}

