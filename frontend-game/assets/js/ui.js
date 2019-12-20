"use strict";

let birdColor = "_blue";

let ui;

ui = function () {
    let components = {
        startScreen: {
            title: {
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
            },
            highScoreList: {
                width: function (canvas) {
                    return canvas.width * 0.465;
                },
                height: function (canvas) {
                    return canvas.height * 0.2475;
                },
                left: function (canvas) {
                    return (canvas.width - components.startScreen.highScoreList.width(canvas)) * 0.5;
                },
                top: function (canvas) {
                    return canvas.height * 0.345;
                }
            },
            playButton: {
                text: "PLAY",
                width: function (canvas) {
                    return canvas.width * 0.325;
                },
                height: function (canvas) {
                    return canvas.height * 0.105;
                },
                left: function (canvas) {
                    return (canvas.width - components.startScreen.playButton.width(canvas)) * 0.5;
                },
                top: function (canvas) {
                    return canvas.height * 0.66;
                },
                fontSize: function (canvas) {
                    return canvas.height * 0.08;
                }
            }
        },
        readyScreen: {
            title: {
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
        },
        gameScreen: {
            bird: {
                wingState: 1,
                isFlying: false,
                wingFlapCount: 0,
                maxWingFlaps: 3,
                startedFlying: null,
            }
        },
        gameOverScreen: {
            pane: {
                width: function (canvas) {
                    return canvas.width * 0.465;
                },
                height: function (canvas) {
                    return canvas.height * 0.2475;
                },
                left: function (canvas) {
                    return (canvas.width - components.startScreen.highScoreList.width(canvas)) * 0.5;
                },
                top: function (canvas) {
                    return canvas.height * 0.345;
                }
            },
            submitScoreButton: {
                text: "SAVE",
                width: function (canvas) {
                    return components.gameOverScreen.pane.width(canvas) / 2;
                },
                height: function (canvas) {
                    return canvas.height * 0.105;
                },
                left: function (canvas) {
                    return components.gameOverScreen.pane.left(canvas) - canvas.width * 0.0275;
                },
                top: function (canvas) {
                    return canvas.height * 0.66;
                },
                fontSize: function (canvas) {
                    return canvas.height * 0.0675;
                }
            },
            restartButton: {
                text: "RETRY",
                width: function (canvas) {
                    return components.gameOverScreen.pane.width(canvas) / 2;
                },
                height: function (canvas) {
                    return canvas.height * 0.105;
                },
                left: function (canvas) {
                    return components.gameOverScreen.pane.left(canvas) + components.gameOverScreen.pane.width(canvas) - components.gameOverScreen.restartButton.width(canvas) + canvas.width * 0.0275;
                },
                top: function (canvas) {
                    return canvas.height * 0.66;
                },
                fontSize: function (canvas) {
                    return canvas.height * 0.0675;
                }
            },
            title: {
                text: "Game Over",
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

    let drawBorder = function (canvas) {
        let ctx = canvas.getContext("2d");

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width * 0.004, canvas.height);
        ctx.fillRect(canvas.width * 0.996, 0, canvas.width * 0.004, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height * 0.004);
        ctx.fillRect(0, canvas.height * 0.996, canvas.width, canvas.height * 0.004);
    };

    let drawBasicStaticBackground = function (canvas, groundY) {
        let ctx = canvas.getContext("2d");

        ctx.fillStyle = "rgb(221,218,147)";
        ctx.fillRect(
            0,
            canvas.height * groundY + canvas.height * 0.025,
            canvas.width,
            canvas.height * (1 - groundY - 0.025)
        );

        ctx.fillStyle = "rgb(111,198,207)";
        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height * groundY + canvas.height * 0.025
        );

        ctx.drawImage(
            loads.skyscrapers,
            0,
            canvas.height * groundY - canvas.height * 0.25,
            canvas.width,
            canvas.width * loads.skyscrapers.height / loads.skyscrapers.width
        );

        ctx.fillStyle = "rgb(78,68,58)";
        ctx.fillRect(
            0,
            canvas.height * groundY,
            canvas.width,
            canvas.height * 0.032
        );

        ctx.fillStyle = "rgb(205,223,147)";
        ctx.fillRect(
            0,
            canvas.height * groundY + canvas.height * 0.005,
            canvas.width,
            canvas.height * 0.032
        );

        ctx.fillStyle = "rgb(209,242,137)";
        ctx.fillRect(
            0,
            canvas.height * groundY + canvas.height * 0.00625,
            canvas.width,
            canvas.height * 0.032
        );

        ctx.fillStyle = "rgb(202,185,103)";
        ctx.fillRect(
            0,
            canvas.height * groundY + canvas.height * 0.01,
            canvas.width,
            canvas.height * 0.032
        );

        ctx.fillStyle = "rgb(125,137,39)";
        ctx.fillRect(
            0,
            canvas.height * groundY + canvas.height * 0.01,
            canvas.width,
            canvas.height * 0.028
        );

        ctx.fillStyle = "rgb(100,134,22)";
        ctx.fillRect(
            0,
            canvas.height * groundY + canvas.height * 0.01,
            canvas.width,
            canvas.height * 0.027
        );

        ctx.fillStyle = "rgb(118,190,44)";
        ctx.fillRect(
            0,
            canvas.height * groundY + canvas.height * 0.01,
            canvas.width,
            canvas.height * 0.025
        );
    };

    let drawGroundPatch = function (canvas, x, y) {
        let ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.moveTo(x, y + canvas.height * 0.035); // 0.85
        ctx.lineTo(x + canvas.width * 0.025, y + canvas.height * 0.035);
        ctx.lineTo(x + canvas.width * 0.045, y + canvas.height * 0.01);
        ctx.lineTo(x + canvas.width * 0.02, y + canvas.height * 0.01);
        ctx.fillStyle = "rgb(165,230,86)";
        ctx.fill();
    };

    let drawGround = function (canvas, x, y) {
        x = x % (canvas.width * 0.05);

        let beginY = canvas.height * y;
        let ctx = canvas.getContext("2d");

        ctx.fillStyle = "rgb(78,68,58)";
        ctx.fillRect(
            0,
            canvas.height * groundY,
            canvas.width,
            canvas.height * 0.032
        );

        ctx.fillStyle = "rgb(205,223,147)";
        ctx.fillRect(
            0,
            canvas.height * groundY + canvas.height * 0.005,
            canvas.width,
            canvas.height * 0.02
        );

        ctx.fillStyle = "rgb(118,190,44)";
        ctx.fillRect(
            0,
            beginY + canvas.height * 0.01, // 0.825,
            canvas.width,
            canvas.height * 0.025
        );

        for(let i = -1; i <= (canvas.width / (canvas.width * 0.05)) + 1; i++){
            drawGroundPatch(canvas, x + i * canvas.width * 0.05, beginY);
        }
        return canvas.width * 0.05;
    };

    let drawTube = function (canvas, x, y, isTopOrientation, size, groundY) {
        let ctx = canvas.getContext("2d");

        // Bottom Orientation
        let startY = y; // 0.8198
        let height = canvas.height * groundY + canvas.height * 0.0048 - startY;

        if(isTopOrientation) {
            startY = - 0.005 * canvas.height;
            height = y + 0.005 * canvas.height;
        }

        ctx.fillStyle = "rgb(78,68,58)";
        ctx.fillRect(
            x,
            startY,
            canvas.width * size - canvas.width * 0.012,
            height
        );

        ctx.fillStyle = "rgb(209,241,132)";
        ctx.fillRect(
            x + canvas.width * 0.005,
            startY + canvas.height * 0.005,
            canvas.width * size * 0.5,
            height - canvas.height * 0.01
        );

        ctx.fillStyle = "rgb(153,230,92)";
        ctx.fillRect(
            x + canvas.width * 0.0125,
            startY + canvas.height * 0.005,
            canvas.width * size * 0.5,
            height - canvas.height * 0.01
        );

        ctx.fillStyle = "rgb(85,128,38)";
        ctx.fillRect(
            x + canvas.width * size * 0.5,
            startY + canvas.height * 0.005,
            canvas.width * size * 0.5 - canvas.width * 0.016,
            height - canvas.height * 0.01
        );

        ctx.fillStyle = "rgb(113,193,46)";
        ctx.fillRect(
            x + canvas.width * 0.0425,
            startY + canvas.height * 0.005,
            canvas.width * size - canvas.width * 0.08425,
            height - canvas.height * 0.01
        );
        ctx.fillRect(
            x + canvas.width * 0.03,
            startY + canvas.height * 0.005,
            canvas.width * 0.0065,
            height - canvas.height * 0.01
        );

        ctx.fillRect(
            x + canvas.width * size - canvas.width * 0.0345,
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
            canvas.width * size, // 0.137,
            height
        );

        ctx.fillStyle = "rgb(209,241,132)";
        ctx.fillRect(
            x - canvas.width * 0.001,
            startY + canvas.height * 0.005,
            canvas.width * size * 0.5,
            height - canvas.height * 0.01
        );

        ctx.fillStyle = "rgb(153,230,92)";
        ctx.fillRect(
            x + canvas.width * 0.0065,
            startY + canvas.height * 0.005,
            canvas.width * size * 0.5,
            height - canvas.height * 0.01
        );

        ctx.fillStyle = "rgb(85,128,38)";
        ctx.fillRect(
            x + canvas.width * size * 0.5,
            startY + canvas.height * 0.005,
            canvas.width * size * 0.5 - canvas.width * 0.01,
            height - canvas.height * 0.01
        );

        ctx.fillStyle = "rgb(113,193,46)";
        ctx.fillRect(
            x + canvas.width * 0.0365,
            startY + canvas.height * 0.005,
            canvas.width * size - canvas.width * 0.07225,
            height - canvas.height * 0.01
        );
        ctx.fillRect(
            x + canvas.width * 0.024,
            startY + canvas.height * 0.005,
            canvas.width * 0.0065,
            height - canvas.height * 0.01
        );

        ctx.fillRect(
            x + canvas.width * size - canvas.width * 0.0285,
            startY + canvas.height * 0.005,
            canvas.width * 0.0065,
            height - canvas.height * 0.01
        );
    };

    let drawTubes = function (canvas, tubes, groundY) {
        tubes.forEach((tube) => {
            drawTube(canvas, tube.x * canvas.width, tube.y * canvas.height, tube.isTopOrientation, tube.size, groundY);
        });
    };

    let drawTitle = function (canvas, component, opacity = 1, offsetY = 0) {
        let ctx = canvas.getContext("2d");
        let fontSize = canvas.height * 0.06;

        offsetY = offsetY * canvas.height;

        ctx.globalAlpha = opacity;
        ctx.fillStyle = "white";
        ctx.font = fontSize + "px Flappy Better, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(
            component.text,
            - canvas.width * 0.006 + component.left(canvas),
            - canvas.height * 0.006 + component.top(canvas) + offsetY,
            canvas.width
        );
        ctx.fillText(
            component.text,
            - canvas.width * 0.006 + component.left(canvas),
            canvas.height * 0.006 + component.top(canvas) + offsetY,
            canvas.width
        );
        ctx.fillText(
            component.text,
            canvas.width * 0.006 + component.left(canvas),
            canvas.height * 0.006 + component.top(canvas) + offsetY,
            canvas.width
        );
        ctx.fillText(
            component.text,
            canvas.width * 0.006 + component.left(canvas),
            - canvas.height * 0.006 + component.top(canvas) + offsetY,
            canvas.width
        );

        ctx.fillStyle = "rgb(243,180,4)";
        ctx.fillText(
            component.text,
            component.left(canvas),
            component.top(canvas) + offsetY,
            canvas.width
        );

        ctx.lineWidth = fontSize*0.05;
        ctx.strokeStyle = "rgb(78,68,58)";
        ctx.strokeText(
            component.text,
            component.left(canvas),
            component.top(canvas) + offsetY,
            canvas.width
        );
        ctx.globalAlpha = 1;
    };

    let drawButton = function (canvas, component, offsetY = 0) {
        offsetY = canvas.height * offsetY;

        let ctx = canvas.getContext("2d");

        ctx.fillStyle = "rgb(78,68,58)";
        ctx.fillRect(
            component.left(canvas),
            component.top(canvas) + offsetY,
            component.width(canvas),
            component.height(canvas)
        );

        ctx.fillStyle = "rgb(223,216,144)";
        ctx.fillRect(
            component.left(canvas) + canvas.width * 0.0075,
            component.top(canvas) + canvas.width * 0.0075 + offsetY,
            component.width(canvas) - canvas.width * 0.015,
            component.height(canvas) - canvas.width * 0.015
        );

        ctx.fillStyle = "rgb(242,96,0)";
        ctx.fillRect(
            component.left(canvas) + canvas.width * 0.015,
            component.top(canvas) + canvas.width * 0.015 + offsetY,
            component.width(canvas) - canvas.width * 0.03,
            component.height(canvas) - canvas.width * 0.03
        );

        let fontSize = component.fontSize(canvas);
        ctx.fillStyle = "rgb(223,216,144)";
        ctx.font = fontSize + "px Flappy Regular, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(
            component.text,
            component.left(canvas) + component.width(canvas) * 0.5,
            component.top(canvas) + component.height(canvas) * 0.5 + component.fontSize(canvas) * 0.25 + offsetY,
            component.width(canvas)
        );
    };

    let drawPane = function (canvas, component, offsetY = 0, opacity = 1) {
        offsetY = offsetY * canvas.height;

        let ctx = canvas.getContext("2d");

        ctx.globalAlpha = opacity;

        ctx.fillStyle = "rgb(78,68,58)";
        ctx.fillRect(
            component.left(canvas) - canvas.width * 0.0275,
            component.top(canvas) - canvas.width * 0.0275 + offsetY,
            component.width(canvas) + canvas.width * 0.055,
            component.height(canvas)+ canvas.width * 0.055
        );

        ctx.fillStyle = "rgb(223,216,144)";
        ctx.fillRect(
            component.left(canvas) - canvas.width * 0.02,
            component.top(canvas) - canvas.width * 0.02 + offsetY,
            component.width(canvas) + canvas.width * 0.04,
            component.height(canvas)+ canvas.width * 0.04
        );

        ctx.fillStyle = "rgb(207,189,107)";
        ctx.fillRect(
            component.left(canvas) - canvas.width * 0.014,
            component.top(canvas) - canvas.width * 0.014 + offsetY,
            component.width(canvas) + canvas.width * 0.028,
            component.height(canvas)+ canvas.width * 0.028
        );

        ctx.fillStyle = "rgb(223,216,144)";
        ctx.fillRect(
            component.left(canvas) - canvas.width * 0.008,
            component.top(canvas) - canvas.width * 0.008 + offsetY,
            component.width(canvas) + canvas.width * 0.016,
            component.height(canvas) + canvas.width * 0.016
        );

        ctx.globalAlpha = 1;
    };

    let drawStartScreen = function (canvas, highScores, groundY) {
        resizeCanvas(canvas);

        let ctx = canvas.getContext("2d");

        drawBasicStaticBackground(canvas, groundY);
        drawGround(canvas, 0, groundY);
        drawTitle(canvas, components.startScreen.title);
        drawButton(canvas, components.startScreen.playButton);
        drawPane(canvas, components.startScreen.highScoreList);
        drawBorder(canvas);

        let itemHeight = components.startScreen.highScoreList.height(canvas) / 5;
        highScores.forEach((scoring, i) => {
            ctx.fillStyle = "rgb(207,189,107)";
            ctx.font = itemHeight*0.99 + "px Flappy Regular, sans-serif";
            ctx.textAlign = "left";
            ctx.fillText(
                "#" + ((i+1) < 10 ? "0" + (i+1) : (i+1)),
                components.startScreen.highScoreList.left(canvas) + canvas.width * 0.011,
                components.startScreen.highScoreList.top(canvas) + (i+1) * itemHeight - itemHeight * 0.25,
                components.startScreen.highScoreList.width(canvas)
            );

            ctx.fillStyle = "rgb(78,68,58)";
            ctx.fillText(
                truncateString(scoring.name, 13),
                components.startScreen.highScoreList.left(canvas) + canvas.width * 0.12,
                components.startScreen.highScoreList.top(canvas) + (i+1) * itemHeight - itemHeight * 0.25,
                components.startScreen.highScoreList.width(canvas) * 0.52
            );

            ctx.font = itemHeight*0.925 + "px Flappy Regular, sans-serif";
            ctx.fillStyle = "black";
            ctx.textAlign = "right";
            ctx.fillText(
                scoring.score,
                components.startScreen.highScoreList.left(canvas) + components.startScreen.highScoreList.width(canvas) - canvas.width * 0.008,
                components.startScreen.highScoreList.top(canvas) + (i+1) * itemHeight - itemHeight * 0.25 - canvas.width * 0.003,
                components.startScreen.highScoreList.width(canvas) * 0.41
            );

            ctx.fillText(
                scoring.score,
                components.startScreen.highScoreList.left(canvas) + components.startScreen.highScoreList.width(canvas) - canvas.width * 0.008,
                components.startScreen.highScoreList.top(canvas) + (i+1) * itemHeight - itemHeight * 0.25 + canvas.width * 0.003,
                components.startScreen.highScoreList.width(canvas) * 0.41
            );

            ctx.fillText(
                scoring.score,
                components.startScreen.highScoreList.left(canvas) + components.startScreen.highScoreList.width(canvas) - canvas.width * 0.014,
                components.startScreen.highScoreList.top(canvas) + (i+1) * itemHeight - itemHeight * 0.25 - canvas.width * 0.003,
                components.startScreen.highScoreList.width(canvas) * 0.41
            );

            ctx.fillText(
                scoring.score,
                components.startScreen.highScoreList.left(canvas) + components.startScreen.highScoreList.width(canvas) - canvas.width * 0.014,
                components.startScreen.highScoreList.top(canvas) + (i+1) * itemHeight - itemHeight * 0.25 + canvas.width * 0.003,
                components.startScreen.highScoreList.width(canvas) * 0.41
            );
            ctx.fillText(
                scoring.score,
                components.startScreen.highScoreList.left(canvas) + components.startScreen.highScoreList.width(canvas) - canvas.width * 0.011,
                components.startScreen.highScoreList.top(canvas) + (i+1) * itemHeight - itemHeight * 0.25 - canvas.width * 0.003,
                components.startScreen.highScoreList.width(canvas) * 0.41
            );
            ctx.fillText(
                scoring.score,
                components.startScreen.highScoreList.left(canvas) + components.startScreen.highScoreList.width(canvas) - canvas.width * 0.011,
                components.startScreen.highScoreList.top(canvas) + (i+1) * itemHeight - itemHeight * 0.25 + canvas.width * 0.003,
                components.startScreen.highScoreList.width(canvas) * 0.41
            );

            ctx.fillStyle = "white";
            ctx.fillText(
                scoring.score,
                components.startScreen.highScoreList.left(canvas) + components.startScreen.highScoreList.width(canvas) - canvas.width * 0.011,
                components.startScreen.highScoreList.top(canvas) + (i+1) * itemHeight - itemHeight * 0.25,
                components.startScreen.highScoreList.width(canvas) * 0.41
            );
        });
    };

    let drawGameOverPane = function (canvas, score, opacity) {
        ui.drawPane(canvas, ui.components.gameOverScreen.pane, 0, opacity);

        let ctx = canvas.getContext("2d");

        ctx.globalAlpha = opacity;

        let itemHeight = canvas.height * 0.075;

        ctx.fillStyle = "rgb(207,189,107)";
        ctx.font = itemHeight*0.7 + "px Flappy Regular, sans-serif";
        ctx.textAlign = "left";

        ctx.fillStyle = "rgb(78,68,58)";
        ctx.fillText(
            "Your score",
            canvas.width * 0.32,
            canvas.height * 0.415,
            components.startScreen.highScoreList.width(canvas) * 0.52
        );

        ctx.font = itemHeight * 0.9 + "px Flappy Regular, sans-serif";
        ctx.fillStyle = "black";
        ctx.textAlign = "right";

        ctx.fillText(
            score,
            canvas.width * 0.68 - canvas.width * 0.003,
            canvas.height * 0.415 - canvas.width * 0.003,
            components.startScreen.highScoreList.width(canvas) * 0.41
        );
        ctx.fillText(
            score,
            canvas.width * 0.68 - canvas.width * 0.003,
            canvas.height * 0.415 + canvas.width * 0.003,
            components.startScreen.highScoreList.width(canvas) * 0.41
        );
        ctx.fillText(
            score,
            canvas.width * 0.68 + canvas.width * 0.003,
            canvas.height * 0.415 - canvas.width * 0.003,
            components.startScreen.highScoreList.width(canvas) * 0.41
        );
        ctx.fillText(
            score,
            canvas.width * 0.68 + canvas.width * 0.003,
            canvas.height * 0.415 + canvas.width * 0.003,
            components.startScreen.highScoreList.width(canvas) * 0.41
        );

        ctx.fillStyle = "white";
        ctx.fillText(
            score,
            canvas.width * 0.68,
            canvas.height * 0.415,
            components.startScreen.highScoreList.width(canvas) * 0.41
        );

        ctx.globalAlpha = 1;
    };

    let startBirdAnimation = function () {
            components.gameScreen.bird.isFlying = true;
            //components.gameScreen.bird.wingState = 3;
            components.gameScreen.bird.wingFlapCount = 0;
            components.gameScreen.bird.startedFlying = new Date().getTime();
    };

    let drawBird = function (canvas, x, y, birdSize, tiltRadAngle, isGameOver, showCollisionBox = false) {
        // Wing state is 0, 1 or 2
        let time = new Date().getTime();

        if(isGameOver) {
            components.gameScreen.bird.isFlying = false;
            components.gameScreen.bird.wingState = 1;
        }

        if(components.gameScreen.bird.isFlying) {
            let passedTime = time - components.gameScreen.bird.startedFlying;

            if(35 < passedTime) {
                components.gameScreen.bird.wingState++;
                components.gameScreen.bird.startedFlying = time;

                if(3 < components.gameScreen.bird.wingState) {
                    components.gameScreen.bird.wingState = 0;
                    components.gameScreen.bird.wingFlapCount++;

                    if(2 < components.gameScreen.bird.wingFlapCount) {
                        components.gameScreen.bird.wingState = 3;
                        components.gameScreen.bird.isFlying = false;
                    }
                }
            }
        }

        let ctx = canvas.getContext("2d");
        let width = canvas.width * birdSize; // 0.0865;
        let height = width * loads["bird_"+components.gameScreen.bird.wingState].height / loads["bird_"+components.gameScreen.bird.wingState].width;
        let rotateTransform = Game.getRotateTransform(tiltRadAngle, width, height);

        if(showCollisionBox) {
            ctx.fillStyle = "red";
            ctx.fillRect(
                canvas.width * x + rotateTransform,
                canvas.height * y - rotateTransform,
                width - rotateTransform * 2,
                height + rotateTransform * 2
            );
        }

        ctx.save();
        ctx.translate(canvas.width * x + width * 0.5, canvas.height * y + height * 0.5);
        ctx.rotate(tiltRadAngle);
        ctx.drawImage(
            // ADJUSTED
            // loads["bird_"+components.gameScreen.bird.wingState],
            loads["bird_"+components.gameScreen.bird.wingState+birdColor],
            -width * 0.5,
            -height * 0.5,
            width,
            height
        );
        ctx.restore();
    };

    let drawBirdControlHint = function (canvas, birdSize, opacity) {
        let ctx = canvas.getContext("2d");

        ctx.globalAlpha = opacity;
        let width = canvas.width * 2.63 * birdSize;
        let height = width * loads.birdHint.height / loads.birdHint.width;
        ctx.drawImage(loads.birdHint, (canvas.width - width/2) / 2, canvas.height*0.35, width, height);
        ctx.globalAlpha = 1;
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
        components.startScreen.playButton.enabled = true;
    };

    let disableStartButton = function () {
        components.startScreen.playButton.enabled = false;
    };

    let enableSaveButton = function () {
        components.gameOverScreen.submitScoreButton.enabled = true;
    };

    let disableSaveButton = function () {
        components.gameOverScreen.submitScoreButton.enabled = false;
    };

    let enableRetryButton = function () {
        components.gameOverScreen.restartButton.enabled = true;
    };

    let disableRetryButton = function () {
        components.gameOverScreen.restartButton.enabled = false;
    };

    let checkButtonBounds = function(canvas, button, mouseX, mouseY) {
        return button.left(canvas) <= mouseX && mouseX <= (button.left(canvas) + button.width(canvas))
            && button.top(canvas) <= mouseY && mouseY <= (button.top(canvas) + button.height(canvas));
    };

    return {
        "components": components,
        "resizeCanvas": resizeCanvas,
        "checkButtonBounds": checkButtonBounds,
        "enableStartButton": enableStartButton,
        "enableSaveScoreButton": enableSaveButton,
        "enableRetryButton": enableRetryButton,
        "disableStartButton": disableStartButton,
        "disableSaveScoreButton": disableSaveButton,
        "disableRetryButton": disableRetryButton,
        "setLoads": setLoads,
        "startBirdAnimation": startBirdAnimation,
        "drawStartScreen": drawStartScreen,
        "drawGameOverPane": drawGameOverPane,
        "drawGroundPatch": drawGroundPatch,
        "drawGround": drawGround,
        "drawTube": drawTube,
        "drawBasicStaticBackground": drawBasicStaticBackground,
        "drawTitle": drawTitle,
        "drawBird": drawBird,
        "drawBirdControlHint": drawBirdControlHint,
        "drawScore": drawScore,
        "drawOverlay": drawOverlay,
        "drawTubes": drawTubes,
        "drawPane": drawPane,
        "drawButton": drawButton,
        "drawBorder": drawBorder
    }
}();

function truncateString(str, num) {
    if (str.length <= num) {
        return str;
    }
    return str.slice(0, num) + '...';
}