const commando = require('discord.js-commando');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

class getMtgCard extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'card',
            group: 'simple',
            memberName: 'card',
            description: 'Finds an mtg card of the given name'
        });
    }

    async run(message, args)
    {
        if(args == ""){
            message.reply("Give me a name!");
        } 
        var url = 'https://api.scryfall.com/cards/named?fuzzy=' + args;
        var request = new XMLHttpRequest();
        var parse;
        request.open( "GET", url, false ); // false for synchronous request
        
        request.onload = function () {
        parse = JSON.parse(this.responseText);     
        }
        request.send();

        if(!parse.image_uris){
            message.reply("No card found called " + args + ". Try another card")
        } else{
            var imageURL = parse.image_uris.normal;

        message.reply(imageURL);
        }
    }
}


module.exports = getMtgCard;