const commando = require('discord.js-commando');

class leaveChannel extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'leave',
            group: 'music',
            memberName: 'leave',
            description: 'Leaves the voice channel of the user'
        });
    }

    async run(message, args)
    {
        if (message.guild.voice.connection)
        {
            message.guild.voice.connection.disconnect();
        }
        else
        {
            message.reply("Dafuq man, I ain't even there");
        }
    }
}

module.exports = leaveChannel;