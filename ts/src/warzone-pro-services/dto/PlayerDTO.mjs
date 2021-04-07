class PlayerDTO{



    constructor(gamerId, gamerRank, wins, kills, deaths, kdr, gamesPlayed, score, spm, timePlayed ,topFive, topTen, topTwoFive, downs, cash, contracts){

        this.gamerId = gamerId;
        this.gamerRank = gamerRank;
        this.wins = wins;
        this.kills = kills;
        this.deaths = deaths;
        this.kdr = kdr;
        this.gamesPlayed = gamesPlayed;
        this.score = score;
        this.spm = spm;
        this.timePlayed = timePlayed;
        this.topFive = topFive;
        this.topTen  = topTen;
        this.topTwoFive = topTwoFive;
        this.downs = downs;
        this.cash = cash;
        this.contracts = contracts;

    }


    getGamerId(){
        return this.gamerId;
    }

    getGamerRank(){
        return this.gamerRank;
    }

    getWins(){
        return this.wins;
    }

    getKDR(){
        return this.kdr;
    }

    getKills(){
        return this.kills;
    }

    getDeaths(){
        return this.deaths;
    }

    getGamesPlayed(){
        return this.gamesPlayed;
    }

    getScore(){
        return this.score;
    }

    getSPM(){
        return this.spm;
    }

    getTimePlayed(){
        return this.timePlayed;
    }

    getTopFive(){
        return this.topFive;
    }

    getTopTen(){
        return this.topTen;
    }

    getTopTwoFive(){
        return this.topTwoFive;
    }

    getDowns(){
        return this.downs;
    }

    getCash(){
        return this.cash;
    }

    getContracts(){
        return this.contracts;
    }


}

export default PlayerDTO;