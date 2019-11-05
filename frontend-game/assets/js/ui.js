"use strict";

let ui;

ui = function () {
    let components = {
        startScreen: {
            attributes: {
                width: function (canvas) {
                    return canvas.width / 1.75;
                },
                height: function (canvas) {
                    return canvas.height / 1.5;
                },
                left: function (canvas) {
                    return (canvas.width - components.startScreen.attributes.width(canvas)) / 2;
                },
                top: function (canvas) {
                    return (canvas.height - components.startScreen.attributes.height(canvas)) / 2;
                },
            },
            components: {
                title: {
                    attributes: {
                        fontSize: function (canvas) {
                            return canvas.height * 0.06;
                        },
                        left: function (canvas) {
                            return canvas.width / 2;
                        },
                        top: function (canvas) {
                            return (canvas.height - components.startScreen.attributes.height(canvas)) / 2 + components.startScreen.components.title.attributes.fontSize(canvas) + canvas.height * 0.03;
                        },
                        maxWidth: function (canvas) {
                            return components.startScreen.attributes.width(canvas);
                        }
                    }
                },
                highScoreList: {
                    attributes: {
                        width: function (canvas) {
                            return components.startScreen.attributes.width(canvas) * 0.8;
                        },
                        height: function (canvas) {
                            return components.startScreen.attributes.height(canvas) - components.startScreen.components.title.attributes.fontSize(canvas) - components.startScreen.components.playButton.attributes.height(canvas) - canvas.height * 0.26;
                        },
                        left: function (canvas) {
                            return (canvas.width - components.startScreen.components.highScoreList.attributes.width(canvas)) / 2;
                        },
                        top: function (canvas) {
                            return (canvas.height - components.startScreen.attributes.height(canvas)) / 2 + components.startScreen.components.title.attributes.fontSize(canvas) + canvas.height * 0.12;
                        }
                    }
                },
                playButton: {
                    attributes: {
                        width: function (canvas) {
                            return canvas.width / 2.75;
                        },
                        height: function (canvas) {
                            return canvas.height / 9;
                        },
                        left: function (canvas) {
                            return (canvas.width - components.startScreen.components.playButton.attributes.width(canvas)) / 2;
                        },
                        top: function (canvas) {
                            return (canvas.height + components.startScreen.attributes.height(canvas)) / 2 - components.startScreen.components.playButton.attributes.height(canvas) - canvas.height * 0.075;
                        }
                    },
                    components: {
                        title: {
                            attributes: {
                                fontSize: function (canvas) {
                                    return canvas.height * 0.08;
                                },
                                left: function (canvas) {
                                    return canvas.width / 2;
                                },
                                top: function (canvas) {
                                    return (canvas.height + components.startScreen.attributes.height(canvas)) / 2 - canvas.height * 0.08 - components.startScreen.components.playButton.attributes.height(canvas) / 2 + components.startScreen.components.playButton.components.title.attributes.fontSize(canvas) / 3.25;
                                },
                                maxWidth: function (canvas) {
                                    return components.startScreen.components.playButton.attributes.width(canvas);
                                }
                            }
                        }
                    }
                }
            }
        },
    };

    let resizeCanvas = function (canvas) {
        let cw = canvas.clientWidth;
        let ch = canvas.clientHeight;
        let width = cw < ch ? ch : cw;
        let height = cw < ch ? ch : cw;
        canvas.width = width;
        canvas.height = height;
    };

    let drawGround = function (canvas) {
        resizeCanvas(canvas);

        let ctx = canvas.getContext("2d");

        ctx.fillStyle = "rgb(221,218,147)";
        ctx.fillRect(
            0,
            canvas.height * 0.775,
            canvas.width,
            canvas.height * 0.225
        );

        ctx.fillStyle = "rgb(111,198,207)";
        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height * 0.775
        );
    };

    let drawStartScreen = function (canvas, highscores) {
        resizeCanvas(canvas);

        let ctx = canvas.getContext("2d");

        ctx.fillStyle = "red";
        ctx.fillRect(0,0,canvas.width, canvas.height);

        drawGround(canvas);

        let fontSize = components.startScreen.components.title.attributes.fontSize(canvas);
        ctx.fillStyle = "white";
        ctx.font = fontSize + "px Flappy Better, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(
            "High scores",
            components.startScreen.components.title.attributes.left(canvas)*0.988,
            components.startScreen.components.title.attributes.top(canvas)*0.97,
            components.startScreen.components.title.attributes.maxWidth(canvas)
        );
        ctx.fillText(
            "High scores",
            components.startScreen.components.title.attributes.left(canvas)*0.988,
            components.startScreen.components.title.attributes.top(canvas)/0.974,
            components.startScreen.components.title.attributes.maxWidth(canvas)
        );
        ctx.fillText(
            "High scores",
            components.startScreen.components.title.attributes.left(canvas)/0.988,
            components.startScreen.components.title.attributes.top(canvas)/0.974,
            components.startScreen.components.title.attributes.maxWidth(canvas)
        );
        ctx.fillText(
            "High scores",
            components.startScreen.components.title.attributes.left(canvas)/0.988,
            components.startScreen.components.title.attributes.top(canvas)*0.97,
            components.startScreen.components.title.attributes.maxWidth(canvas)
        );

        ctx.fillStyle = "rgb(243,180,4)";
        ctx.font = fontSize*1 + "px Flappy Better, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(
            "High scores",
            components.startScreen.components.title.attributes.left(canvas),
            components.startScreen.components.title.attributes.top(canvas),
            components.startScreen.components.title.attributes.maxWidth(canvas)
        );

        ctx.lineWidth = fontSize*0.05;
        ctx.strokeStyle = "rgb(82,87,62)";
        ctx.strokeText(
            "High scores",
            components.startScreen.components.title.attributes.left(canvas),
            components.startScreen.components.title.attributes.top(canvas),
            components.startScreen.components.title.attributes.maxWidth(canvas)
        );

        ctx.fillStyle = "rgb(82,87,62)";
        ctx.fillRect(
            components.startScreen.components.playButton.attributes.left(canvas),
            components.startScreen.components.playButton.attributes.top(canvas),
            components.startScreen.components.playButton.attributes.width(canvas),
            components.startScreen.components.playButton.attributes.height(canvas)
        );

        ctx.fillStyle = "rgb(223,216,144)";
        ctx.fillRect(
            components.startScreen.components.playButton.attributes.left(canvas)*1.025,
            components.startScreen.components.playButton.attributes.top(canvas)*1.01,
            components.startScreen.components.playButton.attributes.width(canvas)/1.0475,
            components.startScreen.components.playButton.attributes.height(canvas)/1.16
        );

        ctx.fillStyle = "rgb(242,96,0)";
        ctx.fillRect(
            components.startScreen.components.playButton.attributes.left(canvas)*1.05,
            components.startScreen.components.playButton.attributes.top(canvas)*1.02,
            components.startScreen.components.playButton.attributes.width(canvas)/1.0975,
            components.startScreen.components.playButton.attributes.height(canvas)/1.375
        );

        fontSize = components.startScreen.components.playButton.components.title.attributes.fontSize(canvas);
        ctx.fillStyle = "rgb(223,216,144)";
        ctx.font = fontSize + "px Flappy Regular, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(
            "PLAY",
            components.startScreen.components.playButton.components.title.attributes.left(canvas),
            components.startScreen.components.playButton.components.title.attributes.top(canvas),
            components.startScreen.components.playButton.components.title.attributes.maxWidth(canvas)
        );

        ctx.fillStyle = "rgb(82,87,62)";
        ctx.fillRect(
            components.startScreen.components.highScoreList.attributes.left(canvas)*0.91,
            components.startScreen.components.highScoreList.attributes.top(canvas)*0.915,
            components.startScreen.components.highScoreList.attributes.width(canvas)/0.905,
            components.startScreen.components.highScoreList.attributes.height(canvas)/0.842
        );

        ctx.fillStyle = "rgb(223,216,144)";
        ctx.fillRect(
            components.startScreen.components.highScoreList.attributes.left(canvas)*0.935,
            components.startScreen.components.highScoreList.attributes.top(canvas)*0.935,
            components.startScreen.components.highScoreList.attributes.width(canvas)/0.93,
            components.startScreen.components.highScoreList.attributes.height(canvas)/0.885
        );

        ctx.fillStyle = "rgb(207,189,107)";
        ctx.fillRect(
            components.startScreen.components.highScoreList.attributes.left(canvas)*0.9525,
            components.startScreen.components.highScoreList.attributes.top(canvas)*0.955,
            components.startScreen.components.highScoreList.attributes.width(canvas)/0.95,
            components.startScreen.components.highScoreList.attributes.height(canvas)/0.93
        );

        ctx.fillStyle = "rgb(223,216,144)";
        ctx.fillRect(
            components.startScreen.components.highScoreList.attributes.left(canvas)*0.9725,
            components.startScreen.components.highScoreList.attributes.top(canvas)*0.97,
            components.startScreen.components.highScoreList.attributes.width(canvas)/0.9725,
            components.startScreen.components.highScoreList.attributes.height(canvas)/0.97
        );

        let itemHeight = components.startScreen.components.highScoreList.attributes.height(canvas) / 5;
        highscores.forEach((scoring, i) => {
            ctx.fillStyle = "#000000";
            ctx.font = itemHeight*0.99 + "px Flappy Regular, sans-serif";
            ctx.textAlign = "left";
            ctx.fillText(
                "#" + ((i+1) < 10 ? "0" + (i+1) : (i+1)),
                components.startScreen.components.highScoreList.attributes.left(canvas)*1.03,
                components.startScreen.components.highScoreList.attributes.top(canvas) + (i+1) * itemHeight - itemHeight * 0.35,
                components.startScreen.components.highScoreList.attributes.width(canvas)
            );

            ctx.fillText(
                truncateString(scoring.name, 13),
                components.startScreen.components.highScoreList.attributes.left(canvas)*1.4,
                components.startScreen.components.highScoreList.attributes.top(canvas) + (i+1) * itemHeight - itemHeight * 0.35,
                components.startScreen.components.highScoreList.attributes.width(canvas) * 0.45
            );

            ctx.textAlign = "right";
            ctx.fillText(
                scoring.score,
                components.startScreen.components.highScoreList.attributes.left(canvas) + components.startScreen.components.highScoreList.attributes.width(canvas)*0.98,
                components.startScreen.components.highScoreList.attributes.top(canvas) + (i+1) * itemHeight - itemHeight * 0.35,
                components.startScreen.components.highScoreList.attributes.width(canvas) * 0.48
            );
        });
    };

    let enableStartButton = function () {
        components.startScreen.components.playButton.attributes.enabled = true;
    };

    let disableStartButton = function () {
        components.startScreen.components.playButton.attributes.enabled = false;
    };

    let checkButtonBounds = function(canvas, button, mouseX, mouseY) {
        return button.attributes.left(canvas) <= mouseX && mouseX <= (button.attributes.left(canvas) + button.attributes.width(canvas))
            && button.attributes.top(canvas) <= mouseY && mouseY <= (button.attributes.top(canvas) + button.attributes.height(canvas));
    };

    return {
        "components": components,
        "resizeCanvas": resizeCanvas,
        "drawStartScreen": drawStartScreen,
        "checkButtonBounds": checkButtonBounds,
        "enableStartButton": enableStartButton,
        "disableStartButton": disableStartButton
    }
}();

function truncateString(str, num) {
    // If the length of str is less than or equal to num
    // just return str--don't truncate it.
    if (str.length <= num) {
        return str
    }
    // Return str truncated with '...' concatenated to the end of str.
    return str.slice(0, num) + '...'
}