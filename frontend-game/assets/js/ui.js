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
                    return canvas.height / 1.25;
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
                            return (canvas.height - components.startScreen.attributes.height(canvas)) / 2 + components.startScreen.components.title.attributes.fontSize(canvas) + canvas.height * 0.025;
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
                            return components.startScreen.attributes.height(canvas) - components.startScreen.components.title.attributes.fontSize(canvas) - components.startScreen.components.playButton.attributes.height(canvas) - canvas.height * 0.14;
                        },
                        left: function (canvas) {
                            return (canvas.width - components.startScreen.components.highScoreList.attributes.width(canvas)) / 2;
                        },
                        top: function (canvas) {
                            return (canvas.height - components.startScreen.attributes.height(canvas)) / 2 + components.startScreen.components.title.attributes.fontSize(canvas) + canvas.height * 0.065;
                        }
                    }
                },
                playButton: {
                    attributes: {
                        width: function (canvas) {
                            return canvas.width / 2.75;
                        },
                        height: function (canvas) {
                            return canvas.height / 7.5;
                        },
                        left: function (canvas) {
                            return (canvas.width - components.startScreen.components.playButton.attributes.width(canvas)) / 2;
                        },
                        top: function (canvas) {
                            return (canvas.height + components.startScreen.attributes.height(canvas)) / 2 - components.startScreen.components.playButton.attributes.height(canvas) - canvas.height * 0.035;
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
                                    return (canvas.height + components.startScreen.attributes.height(canvas)) / 2 - canvas.height * 0.035 - components.startScreen.components.playButton.attributes.height(canvas) / 2 + components.startScreen.components.playButton.components.title.attributes.fontSize(canvas) / 2.75;
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

    let drawStartScreen = function (canvas, highscores) {
        resizeCanvas(canvas);

        let ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(
            components.startScreen.attributes.left(canvas),
            components.startScreen.attributes.top(canvas),
            components.startScreen.attributes.width(canvas),
            components.startScreen.attributes.height(canvas)
        );

        let fontSize = components.startScreen.components.title.attributes.fontSize(canvas);

        ctx.fillStyle = "#000000";
        ctx.font = fontSize + "px Comic Sans MS";
        ctx.textAlign = "center";
        ctx.fillText(
            "High scores",
            components.startScreen.components.title.attributes.left(canvas),
            components.startScreen.components.title.attributes.top(canvas),
            components.startScreen.components.title.attributes.maxWidth(canvas)
        );

        ctx.strokeRect(
            components.startScreen.components.playButton.attributes.left(canvas),
            components.startScreen.components.playButton.attributes.top(canvas),
            components.startScreen.components.playButton.attributes.width(canvas),
            components.startScreen.components.playButton.attributes.height(canvas)
        );

        fontSize = components.startScreen.components.playButton.components.title.attributes.fontSize(canvas);
        ctx.fillStyle = "#000000";
        ctx.font = fontSize + "px Comic Sans MS";
        ctx.textAlign = "center";
        ctx.fillText(
            "PLAY",
            components.startScreen.components.playButton.components.title.attributes.left(canvas),
            components.startScreen.components.playButton.components.title.attributes.top(canvas),
            components.startScreen.components.playButton.components.title.attributes.maxWidth(canvas)
        );

        // ctx.strokeRect(
        //     components.startScreen.components.highScoreList.attributes.left(canvas),
        //     components.startScreen.components.highScoreList.attributes.top(canvas),
        //     components.startScreen.components.highScoreList.attributes.width(canvas),
        //     components.startScreen.components.highScoreList.attributes.height(canvas)
        // );

        let itemHeight = components.startScreen.components.highScoreList.attributes.height(canvas) / 10;
        highscores.forEach((scoring, i) => {
            ctx.fillStyle = "#000000";
            ctx.font = itemHeight*0.75 + "px sans-serif";
            ctx.textAlign = "left";
            ctx.fillText(
                "#" + ((i+1) < 10 ? "0" + (i+1) : (i+1)),
                components.startScreen.components.highScoreList.attributes.left(canvas),
                components.startScreen.components.highScoreList.attributes.top(canvas) + (i+1) * itemHeight - itemHeight * 0.25,
                components.startScreen.components.highScoreList.attributes.width(canvas)
            );

            ctx.fillText(
                scoring.name,
                components.startScreen.components.highScoreList.attributes.left(canvas) + components.startScreen.components.highScoreList.attributes.width(canvas) * 0.25,
                components.startScreen.components.highScoreList.attributes.top(canvas) + (i+1) * itemHeight - itemHeight * 0.25,
                components.startScreen.components.highScoreList.attributes.width(canvas) * 0.45
            );

            ctx.textAlign = "right";
            ctx.fillText(
                scoring.score,
                components.startScreen.components.highScoreList.attributes.left(canvas) + components.startScreen.components.highScoreList.attributes.width(canvas),
                components.startScreen.components.highScoreList.attributes.top(canvas) + (i+1) * itemHeight - itemHeight * 0.25,
                components.startScreen.components.highScoreList.attributes.width(canvas) * 0.5
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