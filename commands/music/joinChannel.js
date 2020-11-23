const commando = require('discord.js-commando');
const YTDL = require('ytdl-core');

class joinChannel extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'join',
            group: 'music',
            memberName: 'join',
            description: 'Joins the voice channel of the user'
        });
    }

    async run(message, args)
    {
        if (message.member.voice.channel)
        {
            if (!message.guild.voiceConnection || message.member.voice.channel.name != message.guild.voiceConnection.channel.name)
            {
                if (!servers[message.guild.id]){
                    servers[message.guild.id] = {queue: []}
                }
                message.member.voice.channel.join()
                .then(connection =>{
                var server = servers[message.guild.id];
                server.dispatcher = connection.play('./entries/zen.mp3');
                message.reply("Joined your voice channel successfully!");})
            }
        }
        else
        {
            message.reply("You are not in a voice channel, weakling!");
        }
    }
}

module.exports = joinChannel;