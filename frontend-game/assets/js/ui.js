"use strict";

let ui;

ui = function () {
    let drawStartScreen = function (canvas) {
        let ctx = canvas.getContext("2d");

        let width = canvas.width * 2;
        let height = canvas.height * 2;
        canvas.width = width;
        canvas.height = height;

        ctx.beginPath();
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(0, 0, width / 2, height / 2);
    };

    return {
        "drawStartScreen": drawStartScreen
    }
}();