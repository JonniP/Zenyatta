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
        return;
        if (args == ""){
            message.reply("No link given :gitgud:");
            return;
        }
        if (message.member.channelID)
        {
            if (!message.guild.voice.connection)
            {
                if (!servers[message.guild.id]){
                    servers[message.guild.id] = {queue: []}
                }
                message.member.voice.channel.join()
                .then(connection =>{
                var server = servers[message.guild.id];
                server.queue.push(args);
                Play(connection, message);})
            } else if (message.member.voice.channel.name != message.guild.voice.connection.channel.name){
                message.guild.voice.connection.disconnect();
                if (!servers[message.guild.id]){
                    servers[message.guild.id] = {queue: []}
                }
                message.member.voice.channel.join()
                .then(connection =>{
                var server = servers[message.guild.id];
                server.queue.push(args);
                Play(connection, message);})
            } else {
                if (message.guild.voice.connection.dispatcher){
                    message.guild.voice.connection.dispatcher.end();
                }
                if (!servers[message.guild.id]){
                    servers[message.guild.id] = {queue: []}
                }
                var server = servers[message.guild.id];
                server.queue.push(args);
                Play(message.member.voice.channel.connection, message);
            }
        }
        else
        {
            message.reply("You are not in a voice channel, weakling!");
        }
    }
}

module.exports = playMusic;