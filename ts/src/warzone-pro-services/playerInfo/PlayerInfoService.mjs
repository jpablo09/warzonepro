
//import PlayerDTO from '../dto/PlayerDTO.mjs'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const unirest = require("unirest");
var gamerId = "zemogaming#2990";
var playerDTO = "";



var req = unirest("GET", "https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/zemogaming%232990/battle");

req.headers({
    "x-rapidapi-key": "54b0ef3a48msh3e709d4e31cf3eap1af23bjsn6d7f08f866aa",
    "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
    "useQueryString": true
});


req.end(function (res) {
    if (res.error) throw new Error(res.error);
    const json = res.body;
    playerDTO = json.br;

    const xhr = new XMLHttpRequest();
    const url = "https://m6rfc7qu8i.execute-api.us-east-2.amazonaws.com/insert_players/playerinfo";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //var json = JSON.parse(xhr.responseText);
            console.log(json);
        }
    };

    const data = JSON.stringify({"gamerId": gamerId , "gamerRank": "n/a", "wins": playerDTO.wins, "kills": playerDTO.kills, "deaths": playerDTO.deaths, "kdRatio": playerDTO.kdRatio,
                                        "gamesPlayed": playerDTO.gamesPlayed, "score": playerDTO.score, "scorePerMin": playerDTO.scorePerMinute, "timePlayed": playerDTO.timePlayed, "topFive": playerDTO.topFive,
                                        "topTen": playerDTO.topTen, "topTwoFive": playerDTO.topTwentyFive, "downs": playerDTO.downs, "cash": playerDTO.cash, "contracts": playerDTO.contracts});
    xhr.send(data);

    /*
    console.log("gamerId: " + gamerId);
    console.log("rank: " + "280");
    console.log("wins: " + playerDTO.wins);
    console.log("kills: " + playerDTO.kills);
    console.log("deaths: " + playerDTO.deaths);
    console.log("kd: " + playerDTO.kdRatio);
     */


});







