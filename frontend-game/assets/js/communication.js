"use strict";

let ws = new WebSocket(ENV.wsConnection);

ws.addEventListener("open", onWSOpen);
ws.addEventListener("close", onWSClose);
ws.addEventListener("error", onWSError);
ws.addEventListener("message", onWSMessage);

function onWSOpen(e) {
    console.log("Connection opened!");

    if(ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify({
            address: "msega.actions.connect",
            data: {
                name: ENV.name
            }
        }));
    }
}

function onWSClose(e) {
    console.log("Connection closed!");
}

function onWSError(e) {
    console.log("Error occurred!");
}

function onWSMessage(e) {
    const data = JSON.parse(e.data);

    console.log("Message received:", data);

    if(data.address === "msega.actions.connect") {
        document.querySelector('#gameId').innerText = data.id;
    } else if(data.address === "msega.actions.deploy") {
        updateOnDeploy(JSON.parse(data.deploy.json_data));
    }
}

function updateOnDeploy(deployData) {
    console.log(deployData);

    deployData.forEach((d) => {
        const id = d.id;
        const exec = d.codeFillExecId;

        if(id === 2) {
            testKeyFunc =
            exec === 1 ? (key) => {return key === "Space";} : (
                exec === 2 ? (key) => {return key = "Space";} : (
                    (key) => {return key === "KeyJ";}
                )
            );
        } else if(id === 5) {
            spaceBetweenFunc =
            exec === 1 ? (level) => { return -( 0.0001 + 0.1 / (level * 0.001 + 0.999) ) } : (
                exec === 2 ? (level) => { return 0.125 + 0.1 / (level * 0.001 + 0.999) } : (
                    (level) => { return 0.0001 + 0.1 / (level * 0.001 + 0.999) }
                )
            );
        } else if(id === 7) {
            birdSize =
            exec === 1 ? 0.4 : (
                exec === 2 ? 0.0865 : (
                    0.025
                )
            );
        } else if(id === 8) {
            speed =
            exec === 1 ? 40 : (
                exec === 2 ? 10 : (
                    100
                )
            );
        } else if(id === 9) {
            gravity =
            exec === 1 ? 10 : (
                exec === 2 ? -5 : (
                    exec === 3 ? 3.5 : (
                        -3.5
                    )
                )
            );
        } else if(id === 10) {
            scoreMultiplier =
            exec === 1 ? -3 : (
                exec === 2 ? 0.5 : (
                    0.1
                )
            );
        } else if(id === 14) {
            birdColor =
            exec === 1 ? "_red" : (
                exec === 2 ? "" : (
                    exec === 3 ? "_blue" : (
                        "_flash"
                    )
                )
            );
        } else if(id === 17) {
            tubeColor =
            exec === 1 ? {R: 215, G: 255, B: 254} : (
                exec === 2 ? {R: 113, G: 193, B: 46} : (
                    {R: 211, G: 66, B: 255}
                )
            );
        }
    });
}

