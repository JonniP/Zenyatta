const commando = require('discord.js-commando');
const ytdl = require('discord-ytdl-core');

function Play(connection, url)
{
    let stream = ytdl(url, {
        filter: "audioonly",
        opusEncoded: true,
        encoderArgs: ['-af', 'bass=g=10,dynaudnorm=f=200']
    });
        
    let dispatcher = connection.play(stream, {
            type: "opus"
        });
}


class playMusic extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'play',
            group: 'music',
            memberName: 'play',
            description: 'Plays the linked Youtube-video'
        });
    }

    async run(message, args)
    {
        if (args == ""){
            message.reply("No link given :gitgud:");
            return;
        }
        if (message.member.guild.voice.channelID)
        {
            if (!message.guild.voice.connection)
            {
                message.reply("Add me to your voice channel first with !join")
            } else {
                if (message.member.guild.voice.connection.dispatcher){
                    message.member.guild.voice.connection.dispatcher.destroy();
                }
                Play(message.member.guild.voice.connection, args);
            }
        }
        else
        {
            message.reply("You are not in a voice channel, weakling!");
        }
    }
}

module.exports = playMusic;