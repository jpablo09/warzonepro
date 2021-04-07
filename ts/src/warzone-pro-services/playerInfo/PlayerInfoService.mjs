
import PlayerDTO from '../dto/PlayerDTO.mjs'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);


const unirest = require("unirest");



var gamerId = "Berlin";
var gamerRank = 280;




var req = unirest("GET", "https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/berlin%2311593/battle");

req.headers({
    "x-rapidapi-key": "54b0ef3a48msh3e709d4e31cf3eap1af23bjsn6d7f08f866aa",
    "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
    "useQueryString": true
});



req.end(function (res) {
    if (res.error) throw new Error(res.error);
    const json = res.body;
    //console.log(Object.values(json));
    const keys = JSON.parse(JSON.stringify(json));
    const br = keys.br;
    const values = JSON.parse(JSON.stringify(br));

    let playerDto  = new PlayerDTO(gamerId ,gamerRank , values.wins, values.kills, values.deaths, values.kdRatio, values.gamesPlayed,
        values.score, values.scorePerMinute, values.timePlayed, values.topFive, values.topTen, values.topTwentyFive, values.downs, values.cash, values.contracts);


    console.log("gamerId: " + playerDto.getGamerId());
    console.log("rank: " + playerDto.getGamerRank());
    console.log("wins: " + playerDto.getWins());
    console.log("kills: " + playerDto.getKills());
    console.log("deaths: " + playerDto.getDeaths());
    console.log("kd: " + playerDto.getKDR());




});







