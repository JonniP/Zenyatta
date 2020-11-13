const commando = require('discord.js-commando');

class coinFlip extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'coinflip',
            group: 'simple',
            memberName: 'coinflip',
            description: 'Flips a coin, Heads or Tails'
        });
    }

    async run(message, args)
    {
        var flip = Math.floor(Math.random() * 2);
        if (flip == 0)
        {
            message.reply("Heads!");
        }
        else 
        {
            message.reply("Tails!");
        }
    }
}

module.exports = coinFlip;