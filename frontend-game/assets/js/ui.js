"use strict";

let ui;

ui = function () {
    let components = {
        startScreen: {
            attributes: {
                width: function (canvas) {
                    return canvas.width * 0.58;
                },
                height: function (canvas) {
                    return canvas.height * 0.675;
                },
                left: function (canvas) {
                    return (canvas.width - components.startScreen.attributes.width(canvas)) * 0.5;
                },
                top: function (canvas) {
                    return (canvas.height - components.startScreen.attributes.height(canvas)) * 0.5;
                },
            },
            components: {
                title: {
                    attributes: {
                        text: "Howest Bird",
                        fontSize: function (canvas) {
                            return canvas.height * 0.06;
                        },
                        left: function (canvas) {
                            return canvas.width * 0.5;
                        },
                        top: function (canvas) {
                            return canvas.height * 0.255;
                        },
                        maxWidth: function (canvas) {
                            return canvas.width;
                        }
                    }
                },
                highScoreList: {
                    attributes: {
                        width: function (canvas) {
                            return canvas.width * 0.465;
                        },
                        height: function (canvas) {
                            return canvas.height * 0.2475;
                        },
                        left: function (canvas) {
                            return (canvas.width - components.startScreen.components.highScoreList.attributes.width(canvas)) * 0.5;
                        },
                        top: function (canvas) {
                            return canvas.height * 0.345;
                        }
                    }
                },
                playButton: {
                    attributes: {
                        text: "PLAY",
                        width: function (canvas) {
                            return canvas.width * 0.325;
                        },
                        height: function (canvas) {
                            return canvas.height * 0.105;
                        },
                        left: function (canvas) {
                            return (canvas.width - components.startScreen.components.playButton.attributes.width(canvas)) * 0.5;
                        },
                        top: function (canvas) {
                            return canvas.height * 0.66;
                        },
                        fontSize: function (canvas) {
                            return canvas.height * 0.08;
                        }
                    }
                }
            }
        },
        readyScreen: {
            components: {
                title: {
                    attributes: {
                        text: "Get Ready",
                        fontSize: function (canvas) {
                            return canvas.height * 0.06;
                        },
                        left: function (canvas) {
                            return canvas.width * 0.5;
                        },
                        top: function (canvas) {
                            return canvas.height * 0.255;
                        },
                        maxWidth: function (canvas) {
                            return canvas.width;
                        }
                    }
                }
            }
        }
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

        ctx.drawImage(
            loads.skyscrapers,
            0,
            canvas.height*0.565,
            canvas.width,
            canvas.width * loads.skyscrapers.height / loads.skyscrapers.width
        );

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

    let drawTitle = function (canvas, component) {
        let ctx = canvas.getContext("2d");

        let fontSize = canvas.height * 0.06;
        ctx.fillStyle = "white";
        ctx.font = fontSize + "px Flappy Better, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(
            component.attributes.text,
            - canvas.width * 0.006 + component.attributes.left(canvas),
            canvas.height * 0.249,
            canvas.width
        );
        ctx.fillText(
            component.attributes.text,
            - canvas.width * 0.006 + component.attributes.left(canvas),
            canvas.height * 0.261,
            canvas.width
        );
        ctx.fillText(
            component.attributes.text,
            canvas.width * 0.006 + component.attributes.left(canvas),
            canvas.height * 0.261,
            canvas.width
        );
        ctx.fillText(
            component.attributes.text,
            canvas.width * 0.006 + component.attributes.left(canvas),
            canvas.height * 0.249,
            canvas.width
        );

        ctx.fillStyle = "rgb(243,180,4)";
        ctx.font = fontSize + "px Flappy Better, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(
            component.attributes.text,
            component.attributes.left(canvas),
            canvas.height * 0.255,
            canvas.width
        );

        ctx.lineWidth = fontSize*0.05;
        ctx.strokeStyle = "rgb(78,68,58)";
        ctx.strokeText(
            component.attributes.text,
            component.attributes.left(canvas),
            canvas.height * 0.255,
            canvas.width
        );
    };

    let drawButton = function (canvas, component) {
        let ctx = canvas.getContext("2d");

        ctx.fillStyle = "rgb(78,68,58)";
        ctx.fillRect(
            component.attributes.left(canvas),
            component.attributes.top(canvas),
            component.attributes.width(canvas),
            component.attributes.height(canvas)
        );

        ctx.fillStyle = "rgb(223,216,144)";
        ctx.fillRect(
            component.attributes.left(canvas) + canvas.width * 0.0075,
            component.attributes.top(canvas) + canvas.width * 0.0075,
            component.attributes.width(canvas) - canvas.width * 0.015,
            component.attributes.height(canvas) - canvas.width * 0.015
        );

        ctx.fillStyle = "rgb(242,96,0)";
        ctx.fillRect(
            component.attributes.left(canvas) + canvas.width * 0.015,
            component.attributes.top(canvas) + canvas.width * 0.015,
            component.attributes.width(canvas) - canvas.width * 0.03,
            component.attributes.height(canvas) - canvas.width * 0.03
        );

        let fontSize = component.attributes.fontSize(canvas);
        ctx.fillStyle = "rgb(223,216,144)";
        ctx.font = fontSize + "px Flappy Regular, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(
            component.attributes.text,
            component.attributes.left(canvas) + component.attributes.width(canvas) * 0.5,
            component.attributes.top(canvas) + component.attributes.height(canvas) * 0.5 + component.attributes.fontSize(canvas) * 0.25,
            component.attributes.width(canvas)
        );
    };

    let drawPane = function (canvas, component) {
        let ctx = canvas.getContext("2d");

        ctx.fillStyle = "rgb(78,68,58)";
        ctx.fillRect(
            component.attributes.left(canvas) - canvas.width * 0.0275,
            component.attributes.top(canvas) - canvas.width * 0.0275,
            component.attributes.width(canvas) + canvas.width * 0.055,
            component.attributes.height(canvas)+ canvas.width * 0.055
        );

        ctx.fillStyle = "rgb(223,216,144)";
        ctx.fillRect(
            component.attributes.left(canvas) - canvas.width * 0.02,
            component.attributes.top(canvas) - canvas.width * 0.02,
            component.attributes.width(canvas) + canvas.width * 0.04,
            component.attributes.height(canvas)+ canvas.width * 0.04
        );

        ctx.fillStyle = "rgb(207,189,107)";
        ctx.fillRect(
            component.attributes.left(canvas) - canvas.width * 0.014,
            component.attributes.top(canvas) - canvas.width * 0.014,
            component.attributes.width(canvas) + canvas.width * 0.028,
            component.attributes.height(canvas)+ canvas.width * 0.028
        );

        ctx.fillStyle = "rgb(223,216,144)";
        ctx.fillRect(
            component.attributes.left(canvas) - canvas.width * 0.008,
            component.attributes.top(canvas) - canvas.width * 0.008,
            component.attributes.width(canvas) + canvas.width * 0.016,
            component.attributes.height(canvas) + canvas.width * 0.016
        );
    };

    let drawStartScreen = function (canvas, highScores) {
        resizeCanvas(canvas);

        let ctx = canvas.getContext("2d");

        ctx.fillStyle = "red";
        ctx.fillRect(0,0,canvas.width, canvas.height);

        drawBasicStaticBackground(canvas);
        drawGround(canvas, 0);
        drawTitle(canvas, components.startScreen.components.title);
        drawButton(canvas, components.startScreen.components.playButton);
        drawPane(canvas, components.startScreen.components.highScoreList);

        let itemHeight = components.startScreen.components.highScoreList.attributes.height(canvas) / 5;
        highScores.forEach((scoring, i) => {
            ctx.fillStyle = "rgb(207,189,107)";
            ctx.font = itemHeight*0.99 + "px Flappy Regular, sans-serif";
            ctx.textAlign = "left";
            ctx.fillText(
                "#" + ((i+1) < 10 ? "0" + (i+1) : (i+1)),
                components.startScreen.components.highScoreList.attributes.left(canvas) + canvas.width * 0.015,
                components.startScreen.components.highScoreList.attributes.top(canvas) + (i+1) * itemHeight - itemHeight * 0.25,
                components.startScreen.components.highScoreList.attributes.width(canvas)
            );

            ctx.fillStyle = "rgb(78,68,58)";
            ctx.fillText(
                truncateString(scoring.name, 13),
                components.startScreen.components.highScoreList.attributes.left(canvas) + canvas.width * 0.12,
                components.startScreen.components.highScoreList.attributes.top(canvas) + (i+1) * itemHeight - itemHeight * 0.25,
                components.startScreen.components.highScoreList.attributes.width(canvas) * 0.52
            );

            ctx.font = itemHeight*0.925 + "px Flappy Regular, sans-serif";
            ctx.fillStyle = "black";
            ctx.textAlign = "right";
            ctx.fillText(
                scoring.score,
                components.startScreen.components.highScoreList.attributes.left(canvas) + components.startScreen.components.highScoreList.attributes.width(canvas)*0.9725,
                components.startScreen.components.highScoreList.attributes.top(canvas) + (i+1) * itemHeight - itemHeight * 0.25,
                components.startScreen.components.highScoreList.attributes.width(canvas) * 0.41
            );

            ctx.fillText(
                scoring.score,
                components.startScreen.components.highScoreList.attributes.left(canvas) + components.startScreen.components.highScoreList.attributes.width(canvas)*0.985,
                components.startScreen.components.highScoreList.attributes.top(canvas) + (i+1) * itemHeight - itemHeight * 0.25,
                components.startScreen.components.highScoreList.attributes.width(canvas) * 0.48
            );

            ctx.fillText(
                scoring.score,
                components.startScreen.components.highScoreList.attributes.left(canvas) + components.startScreen.components.highScoreList.attributes.width(canvas)*0.985,
                components.startScreen.components.highScoreList.attributes.top(canvas) + (i+1) * itemHeight - itemHeight * 0.3235,
                components.startScreen.components.highScoreList.attributes.width(canvas) * 0.48
            );

            ctx.fillText(
                scoring.score,
                components.startScreen.components.highScoreList.attributes.left(canvas) + components.startScreen.components.highScoreList.attributes.width(canvas)*0.9725,
                components.startScreen.components.highScoreList.attributes.top(canvas) + (i+1) * itemHeight - itemHeight * 0.335,
                components.startScreen.components.highScoreList.attributes.width(canvas) * 0.48
            );

            ctx.fillStyle = "white";
            ctx.fillText(
                scoring.score,
                components.startScreen.components.highScoreList.attributes.left(canvas) + components.startScreen.components.highScoreList.attributes.width(canvas)*0.98,
                components.startScreen.components.highScoreList.attributes.top(canvas) + (i+1) * itemHeight - itemHeight * 0.29,
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