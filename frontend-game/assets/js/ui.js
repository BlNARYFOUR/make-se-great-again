"use strict";

let ui;

ui = function () {
    let drawStartScreen = function (canvas) {
        let ctx = canvas.getContext("2d");

        let width = canvas.width * 2;
        let height = canvas.height * 2;
        canvas.width = width;
        canvas.height = height;

        let startScreenWidth = width / 1.5;
        let startScreenHeight = height / 1.2;

        ctx.beginPath();
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(
            (width - startScreenWidth) / 2,
            (height - startScreenHeight) / 2,
            startScreenWidth,
            startScreenHeight
        );
    };

    return {
        "drawStartScreen": drawStartScreen
    }
}();