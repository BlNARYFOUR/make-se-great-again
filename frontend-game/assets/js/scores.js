"use strict";

let scores;

scores = function () {
    let getHighScoreList = function (callback) {
        fetch(`${ENV.apiUrl}highscores`, {
            method: 'GET'
        })
        .then(function (res) {
            if (res.ok === true)
                return res.json();
            else
                return "ERROR";
        })
        .then(function (data) {
            if(data === "ERROR") {
                console.log("ERROR: Could not get high scores.");
            } else {
                callback(data);
            }
        })
        .catch(function (err) {
            console.log(err +"Error: cannot get high scores");
        });
    };

    let saveScore = function (score, callback) {
        fetch(`${ENV.apiUrl}highscores`, {
            method: 'POST',
            mode: 'cors',
            headers: new Headers({
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
            body: JSON.stringify({
                name: document.querySelector('#userName').value,
                score: score
            })
        })
        .then(function (res) {
            if (res.ok === true)
                return res.json();
            else
                return "ERROR";
        })
        .then(function (data) {
            callback(data);
        })
        .catch(function (err) {
            console.log(err +"\nError: cannot save score");
        });
    };

    return {
        "getHighScoreList": getHighScoreList,
        "saveScore": saveScore,
    };
}();