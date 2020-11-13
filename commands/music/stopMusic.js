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
        if (message.guild.voiceConnection)
        {
            if (message.guild.voiceConnection.dispatcher){
                var server = servers[message.guild.id];
                message.guild.voiceConnection.dispatcher.end();
                server.queue.shift();
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