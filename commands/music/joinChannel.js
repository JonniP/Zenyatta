const commando = require('discord.js-commando');
const YTDL = require('ytdl-core');

function Play(connection, message)
{
    var server = servers[message.guild.id];
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
    server.queue.shift();
    server.dispatcher.on("end", function(){
        if(server.queue[0])
        {
            Play(connection, message);
        }
    });
}

class joinChannel extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'join',
            group: 'music',
            memberName: 'join',
            description: 'Joins the voice channel of the user, add a link to this command to start playing it'
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
                if (args == ""){
                    message.member.voice.channel.join()
                    .then(connection =>{
                    var server = servers[message.guild.id];
                    server.dispatcher = connection.play('./entries/zen.mp3');
                    message.reply("Joined your voice channel successfully!");})
                } else{
                    message.member.voice.channel.join()
                    .then(connection =>{
                    var server = servers[message.guild.id];
                    message.reply("Joined your voice channel successfully!");
                    server.queue.push(args);
                    Play(connection, message);})
                }
            }
        }
        else
        {
            message.reply("You are not in a voice channel, weakling!");
        }
    }
}

module.exports = joinChannel;