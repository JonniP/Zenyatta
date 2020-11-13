const commando = require('discord.js-commando');
var key = require('./lolAuth.json');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

class checkLoLRank extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'lolrank',
            group: 'simple',
            memberName: 'lolrank',
            description: 'Uses highly sophisticated script to fetch the ranks and most played champions of a given player '
        });
    }

    async run(message, args)
    {
        var response = {"name": "", "level": "", "rank3": "UNRANKED", "solorank": "UNRANKED", "rank5": "UNRANKED", "rankTFT": "UNRANKED" ,"id": ""};
        if(args == ""){
            message.reply("Give me a name!");
        } 
        var url = "https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + args + "?api_key=" + key.token;

        var request = new XMLHttpRequest();
        request.open( "GET", url, false ); // false for synchronous request
        
        request.onload = function () {
        var parse = JSON.parse(this.responseText);
        response.name = parse.name;
        response.level = parse.summonerLevel;
        response.id = parse.id;
        }
        request.send();

        url = "https://eun1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + response.id + "?api_key=" + key.token;
        request = new XMLHttpRequest();

        request.open( "GET", url, false ); // false for synchronous request
        
        request.onload = function () {
            var parse = JSON.parse(this.responseText);
            for (let i = 0; i < parse.length; i++){
                if (parse[i].queueType == "RANKED_SOLO_5x5"){
                    response.solorank = parse[i].tier + " " + parse[i].rank;
                } else if (parse[i].queueType == "RANKED_FLEX_TT"){
                    response.rank3 = parse[i].tier + " " + parse[i].rank;
                } else if (parse[i].queueType == "RANKED_FLEX_SR"){
                    response.rank5 = parse[i].tier + " " + parse[i].rank;
                }
                else if (parse[i].queueType == "RANKED_TFT"){
                    response.rankTFT = parse[i].tier + " " + parse[i].rank;
                }
            }
        }
        request.send();

        message.reply("Summoner: " + response.name + ". Level: " + response.level + ". Solo/Duo: " + response.solorank + ". Flex 5v5: " + response.rank5 + ". Flex 3v3: " + response.rank3 + ". Teamfight Tactics: " + response.rankTFT);
    }
}


module.exports = checkLoLRank;