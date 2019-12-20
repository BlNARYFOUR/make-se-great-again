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
        }
    });
}

