"use strict";

document.addEventListener("DOMContentLoaded", init);

function init(e) {
    console.log("Hello World!");

    let canvas = document.querySelector('#gameEnv');
    let ctx = canvas.getContext("2d");

    ui.drawStartScreen(canvas);
}

