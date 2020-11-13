const commando = require('discord.js-commando');
var fs = require('fs');

class listQuotes extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'quotes',
            group: 'simple',
            memberName: 'quotes',
            description: 'Lists all available quotes'
        });
    }

    async run(message, args)
    {
        var files = fs.readdirSync('./quotes');
        message.reply(files);
    }
}

module.exports = listQuotes;