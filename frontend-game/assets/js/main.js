"use strict";

document.addEventListener("DOMContentLoaded", init);

function init(e) {
    console.log("Hello World!");

    let canvas = document.querySelector('#gameEnv');
    let ctx = canvas.getContext("2d");

    ui.drawStartScreen(canvas, getHighScores());
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

