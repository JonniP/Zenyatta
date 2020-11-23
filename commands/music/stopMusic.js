const commando = require('discord.js-commando');

class stopMusic extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'stop',
            group: 'music',
            memberName: 'stop',
            description: 'Stops playing the current audio'
        });
    }

    async run(message, args)
    {
        if (message.guild.voice.connection)
        {
            if (message.guild.voice.connection.dispatcher){
                message.guild.voice.connection.dispatcher.destroy();
            } else{
                message.reply("I don't think I'm playing anything at the moment");
            }
        }
        else
        {
            message.reply("I ain't even there LUL");
        }
    }
}

module.exports = stopMusic;