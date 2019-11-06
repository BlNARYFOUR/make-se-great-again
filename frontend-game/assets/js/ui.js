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
    let loads;

    let setLoads = function (loadedFiles) {
        loads = loadedFiles;
    };

    let resizeCanvas = function (canvas) {
        let cw = canvas.clientWidth * 2;
        let ch = canvas.clientHeight * 2;
        let width = cw < ch ? ch : cw;
        let height = cw < ch ? ch : cw;
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").imageSmoothingEnabled = false;
    };

    let drawBasicStaticBackground = function (canvas) {
        let ctx = canvas.getContext("2d");

        ctx.fillStyle = "rgb(221,218,147)";
        ctx.fillRect(
            0,
            canvas.height * 0.85,
            canvas.width,
            canvas.height * 0.15
        );

        ctx.fillStyle = "rgb(111,198,207)";
        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height * 0.85
        );

        ctx.drawImage(loads.skyscrapers, 0, canvas.height*0.565, canvas.width, canvas.width * loads.skyscrapers.height / loads.skyscrapers.width);

        ctx.fillStyle = "rgb(78,68,58)";
        ctx.fillRect(
            0,
            canvas.height * 0.815,
            canvas.width,
            canvas.height * 0.032
        );

        ctx.fillStyle = "rgb(205,223,147)";
        ctx.fillRect(
            0,
            canvas.height * 0.82,
            canvas.width,
            canvas.height * 0.032
        );

        ctx.fillStyle = "rgb(209,242,137)";
        ctx.fillRect(
            0,
            canvas.height * 0.82125,
            canvas.width,
            canvas.height * 0.032
        );

        ctx.fillStyle = "rgb(202,185,103)";
        ctx.fillRect(
            0,
            canvas.height * 0.825,
            canvas.width,
            canvas.height * 0.032
        );

        ctx.fillStyle = "rgb(125,137,39)";
        ctx.fillRect(
            0,
            canvas.height * 0.825,
            canvas.width,
            canvas.height * 0.028
        );

        ctx.fillStyle = "rgb(100,134,22)";
        ctx.fillRect(
            0,
            canvas.height * 0.825,
            canvas.width,
            canvas.height * 0.027
        );

        ctx.fillStyle = "rgb(118,190,44)";
        ctx.fillRect(
            0,
            canvas.height * 0.825,
            canvas.width,
            canvas.height * 0.025
        );
    };

    let drawGroundPatch = function (canvas, x) {
        let ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.moveTo(x, canvas.height * 0.85);
        ctx.lineTo(x + canvas.width * 0.025, canvas.height * 0.85);
        ctx.lineTo(x + canvas.width * 0.045, canvas.height * 0.825);
        ctx.lineTo(x + canvas.width * 0.02, canvas.height * 0.825);
        ctx.fillStyle = "rgb(165,230,86)";
        ctx.fill();
    };

    let drawGround = function (canvas, x) {
        x = /*canvas.width * 0.05 -*/ x % (canvas.width * 0.05);

        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgb(118,190,44)";
        ctx.fillRect(
            0,
            canvas.height * 0.825,
            canvas.width,
            canvas.height * 0.025
        );

        for(let i = -1; i <= (canvas.width / (canvas.width * 0.05)) + 1; i++){
            drawGroundPatch(canvas, x + i * canvas.width * 0.05);
        }
        return canvas.width * 0.05;
    };

    let drawTube = function (canvas, x, y, isTopOrientation) {
        let ctx = canvas.getContext("2d");

        // Bottom Orientation
        let startY = y;
        let height = canvas.height * 0.8198 - startY;

        if(isTopOrientation) {
            startY = - 0.005 * canvas.height;
            height = y + 0.005 * canvas.height;
        }

        ctx.fillStyle = "rgb(78,68,58)";
        ctx.fillRect(
            x,
            startY,
            canvas.width * 0.125,
            height
        );

        ctx.fillStyle = "rgb(209,241,132)";
        ctx.fillRect(
            x + canvas.width * 0.005,
            startY + canvas.height * 0.005,
            canvas.width * 0.115,
            height - canvas.height * 0.01
        );

        ctx.fillStyle = "rgb(153,230,92)";
        ctx.fillRect(
            x + canvas.width * 0.0125,
            startY + canvas.height * 0.005,
            canvas.width * 0.1075,
            height - canvas.height * 0.01
        );

        ctx.fillStyle = "rgb(85,128,38)";
        ctx.fillRect(
            x + canvas.width * 0.06,
            startY + canvas.height * 0.005,
            canvas.width * 0.06,
            height - canvas.height * 0.01
        );

        ctx.fillStyle = "rgb(113,193,46)";
        ctx.fillRect(
            x + canvas.width * 0.0425,
            startY + canvas.height * 0.005,
            canvas.width * 0.05275,
            height - canvas.height * 0.01
        );
        ctx.fillRect(
            x + canvas.width * 0.03,
            startY + canvas.height * 0.005,
            canvas.width * 0.0065,
            height - canvas.height * 0.01
        );

        ctx.fillRect(
            x + canvas.width * 0.1025,
            startY + canvas.height * 0.005,
            canvas.width * 0.0065,
            height - canvas.height * 0.01
        );

        // Bottom Orientation
        startY = y;
        height = canvas.height * 0.06;

        if(isTopOrientation) {
            startY = y - height;
        }

        ctx.fillStyle = "rgb(78,68,58)";
        ctx.fillRect(
            x - canvas.width * 0.006,
            startY,
            canvas.width * 0.137,
            height
        );

        ctx.fillStyle = "rgb(209,241,132)";
        ctx.fillRect(
            x - canvas.width * 0.001,
            startY + canvas.height * 0.005,
            canvas.width * 0.127,
            height - canvas.height * 0.01
        );

        ctx.fillStyle = "rgb(153,230,92)";
        ctx.fillRect(
            x + canvas.width * 0.0065,
            startY + canvas.height * 0.005,
            canvas.width * 0.1195,
            height - canvas.height * 0.01
        );

        ctx.fillStyle = "rgb(85,128,38)";
        ctx.fillRect(
            x + canvas.width * 0.06,
            startY + canvas.height * 0.005,
            canvas.width * 0.067,
            height - canvas.height * 0.01
        );

        ctx.fillStyle = "rgb(113,193,46)";
        ctx.fillRect(
            x + canvas.width * 0.0365,
            startY + canvas.height * 0.005,
            canvas.width * 0.06475,
            height - canvas.height * 0.01
        );
        ctx.fillRect(
            x + canvas.width * 0.024,
            startY + canvas.height * 0.005,
            canvas.width * 0.0065,
            height - canvas.height * 0.01
        );

        ctx.fillRect(
            x + canvas.width * 0.1085,
            startY + canvas.height * 0.005,
            canvas.width * 0.0065,
            height - canvas.height * 0.01
        );
    };

    let drawTubes = function (canvas, tubes) {
        tubes.forEach((tube) => {
            drawTube(canvas, tube.x * canvas.width, tube.y * canvas.height, tube.isTopOrientation);
        });
    };

    let drawTitle = function (canvas, text) {
        let ctx = canvas.getContext("2d");

        let fontSize = components.startScreen.components.title.attributes.fontSize(canvas);
        ctx.fillStyle = "white";
        ctx.font = fontSize + "px Flappy Better, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(
            text,
            components.startScreen.components.title.attributes.left(canvas)*0.988,
            components.startScreen.components.title.attributes.top(canvas)*0.975,
            components.startScreen.components.title.attributes.maxWidth(canvas)
        );
        ctx.fillText(
            text,
            components.startScreen.components.title.attributes.left(canvas)*0.988,
            components.startScreen.components.title.attributes.top(canvas)*1.03,
            components.startScreen.components.title.attributes.maxWidth(canvas)
        );
        ctx.fillText(
            text,
            components.startScreen.components.title.attributes.left(canvas)*1.0125,
            components.startScreen.components.title.attributes.top(canvas)*1.03,
            components.startScreen.components.title.attributes.maxWidth(canvas)
        );
        ctx.fillText(
            text,
            components.startScreen.components.title.attributes.left(canvas)*1.0125,
            components.startScreen.components.title.attributes.top(canvas)*0.975,
            components.startScreen.components.title.attributes.maxWidth(canvas)
        );

        ctx.fillStyle = "rgb(243,180,4)";
        ctx.font = fontSize*1 + "px Flappy Better, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(
            text,
            components.startScreen.components.title.attributes.left(canvas),
            components.startScreen.components.title.attributes.top(canvas),
            components.startScreen.components.title.attributes.maxWidth(canvas)
        );

        ctx.lineWidth = fontSize*0.05;
        ctx.strokeStyle = "rgb(78,68,58)";
        ctx.strokeText(
            text,
            components.startScreen.components.title.attributes.left(canvas),
            components.startScreen.components.title.attributes.top(canvas),
            components.startScreen.components.title.attributes.maxWidth(canvas)
        );
    };

    let drawStartScreen = function (canvas, highScores) {
        resizeCanvas(canvas);

        let ctx = canvas.getContext("2d");

        ctx.fillStyle = "red";
        ctx.fillRect(0,0,canvas.width, canvas.height);

        drawBasicStaticBackground(canvas);

        drawGround(canvas, 0);

        drawTitle(canvas, "Howest Bird");

        ctx.fillStyle = "rgb(78,68,58)";
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
            components.startScreen.components.playButton.attributes.height(canvas)/1.15
        );

        ctx.fillStyle = "rgb(242,96,0)";
        ctx.fillRect(
            components.startScreen.components.playButton.attributes.left(canvas)*1.05,
            components.startScreen.components.playButton.attributes.top(canvas)*1.02,
            components.startScreen.components.playButton.attributes.width(canvas)/1.0975,
            components.startScreen.components.playButton.attributes.height(canvas)/1.34
        );

        let fontSize = components.startScreen.components.playButton.components.title.attributes.fontSize(canvas);
        ctx.fillStyle = "rgb(223,216,144)";
        ctx.font = fontSize + "px Flappy Regular, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(
            "PLAY",
            components.startScreen.components.playButton.components.title.attributes.left(canvas),
            components.startScreen.components.playButton.components.title.attributes.top(canvas),
            components.startScreen.components.playButton.components.title.attributes.maxWidth(canvas)
        );

        ctx.fillStyle = "rgb(78,68,58)";
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
        highScores.forEach((scoring, i) => {
            ctx.fillStyle = "rgb(207,189,107)";
            ctx.font = itemHeight*0.99 + "px Flappy Regular, sans-serif";
            ctx.textAlign = "left";
            ctx.fillText(
                "#" + ((i+1) < 10 ? "0" + (i+1) : (i+1)),
                components.startScreen.components.highScoreList.attributes.left(canvas)*1.03,
                components.startScreen.components.highScoreList.attributes.top(canvas) + (i+1) * itemHeight - itemHeight * 0.35,
                components.startScreen.components.highScoreList.attributes.width(canvas)
            );

            ctx.fillStyle = "rgb(78,68,58)";
            ctx.fillText(
                truncateString(scoring.name, 13),
                components.startScreen.components.highScoreList.attributes.left(canvas)*1.4,
                components.startScreen.components.highScoreList.attributes.top(canvas) + (i+1) * itemHeight - itemHeight * 0.35,
                components.startScreen.components.highScoreList.attributes.width(canvas) * 0.45
            );

            ctx.font = itemHeight*0.925 + "px Flappy Regular, sans-serif";
            ctx.fillStyle = "black";
            ctx.textAlign = "right";
            ctx.fillText(
                scoring.score,
                components.startScreen.components.highScoreList.attributes.left(canvas) + components.startScreen.components.highScoreList.attributes.width(canvas)*0.9725,
                components.startScreen.components.highScoreList.attributes.top(canvas) + (i+1) * itemHeight - itemHeight * 0.35,
                components.startScreen.components.highScoreList.attributes.width(canvas) * 0.48
            );

            ctx.fillText(
                scoring.score,
                components.startScreen.components.highScoreList.attributes.left(canvas) + components.startScreen.components.highScoreList.attributes.width(canvas)*0.985,
                components.startScreen.components.highScoreList.attributes.top(canvas) + (i+1) * itemHeight - itemHeight * 0.35,
                components.startScreen.components.highScoreList.attributes.width(canvas) * 0.48
            );

            ctx.fillText(
                scoring.score,
                components.startScreen.components.highScoreList.attributes.left(canvas) + components.startScreen.components.highScoreList.attributes.width(canvas)*0.985,
                components.startScreen.components.highScoreList.attributes.top(canvas) + (i+1) * itemHeight - itemHeight * 0.4235,
                components.startScreen.components.highScoreList.attributes.width(canvas) * 0.48
            );

            ctx.fillText(
                scoring.score,
                components.startScreen.components.highScoreList.attributes.left(canvas) + components.startScreen.components.highScoreList.attributes.width(canvas)*0.9725,
                components.startScreen.components.highScoreList.attributes.top(canvas) + (i+1) * itemHeight - itemHeight * 0.435,
                components.startScreen.components.highScoreList.attributes.width(canvas) * 0.48
            );

            ctx.fillStyle = "white";
            ctx.fillText(
                scoring.score,
                components.startScreen.components.highScoreList.attributes.left(canvas) + components.startScreen.components.highScoreList.attributes.width(canvas)*0.98,
                components.startScreen.components.highScoreList.attributes.top(canvas) + (i+1) * itemHeight - itemHeight * 0.39,
                components.startScreen.components.highScoreList.attributes.width(canvas) * 0.48
            );
        });
    };

    let drawBird = function (canvas, y, wingState) {
        // Wing state is 0, 1 or 2
        // ctx.drawImage(loads["bird_"+wingState], 0, canvas.height*0.56, canvas.width, canvas.width * loads["bird_"+wingState].height / loads["bird_"+wingState].width);
    };

    let drawBirdControlHint = function (canvas, opacity) {
        let ctx = canvas.getContext("2d");

        ctx.globalAlpha = opacity;
        let width = canvas.width * 0.2275;
        let height = width * loads.birdHint.height / loads.birdHint.width;
        ctx.drawImage(loads.birdHint, (canvas.width - width/2) / 2, canvas.height*0.35, width, height);
    };

    let drawScore = function (canvas, score) {
        let ctx = canvas.getContext("2d");

        ctx.textAlign = "center";
        ctx.font = (canvas.height*0.06) + "px Flappy Better, sans-serif";
        ctx.fillStyle = "black";
        ctx.fillText(
            score,
            canvas.width * 0.497,
            canvas.height * 0.097,
            canvas.width
        );
        ctx.fillText(
            score,
            canvas.width * 0.497,
            canvas.height * 0.103,
            canvas.width
        );
        ctx.fillText(
            score,
            canvas.width * 0.503,
            canvas.height * 0.097,
            canvas.width
        );
        ctx.fillText(
            score,
            canvas.width * 0.503,
            canvas.height * 0.103,
            canvas.width
        );

        ctx.fillStyle = "white";
        ctx.fillText(
            score,
            canvas.width * 0.5,
            canvas.height * 0.1,
            canvas.width
        );
    };

    let drawOverlay = function (canvas, color, opacity) {
        let ctx = canvas.getContext("2d");

        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.globalAlpha = 1;
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
        "checkButtonBounds": checkButtonBounds,
        "enableStartButton": enableStartButton,
        "disableStartButton": disableStartButton,
        "setLoads": setLoads,
        "drawStartScreen": drawStartScreen,
        "drawGroundPatch": drawGroundPatch,
        "drawGround": drawGround,
        "drawTube": drawTube,
        "drawBasicStaticBackground": drawBasicStaticBackground,
        "drawTitle": drawTitle,
        "drawBird": drawBird,
        "drawBirdControlHint": drawBirdControlHint,
        "drawScore": drawScore,
        "drawOverlay": drawOverlay,
        "drawTubes": drawTubes
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