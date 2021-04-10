
//import PlayerDTO from '../dto/PlayerDTO.mjs'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);


const unirest = require("unirest");



var gamerId = "Berlin";
var gamerRank = 280;
var playerDTO = "";



var req = unirest("GET", "https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/berlin%2311593/battle");

req.headers({
    "x-rapidapi-key": "54b0ef3a48msh3e709d4e31cf3eap1af23bjsn6d7f08f866aa",
    "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
    "useQueryString": true
});



req.end(function (res) {
    if (res.error) throw new Error(res.error);
    const json = res.body;
    playerDTO = json.br;


    console.log("gamerId: " + gamerId);
    console.log("rank: " +gamerRank);
    console.log("wins: " + playerDTO.wins);
    console.log("kills: " + playerDTO.kills);
    console.log("deaths: " + playerDTO.deaths);
    console.log("kd: " + playerDTO.kdRatio);




});







