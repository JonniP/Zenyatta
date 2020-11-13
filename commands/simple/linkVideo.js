const commando = require('discord.js-commando');

var videos = ["https://www.youtube.com/watch?v=dQw4w9WgXcQ"];

class linkVideo extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'entertain',
            group: 'simple',
            memberName: 'entertain',
            description: 'Links a random Nordic Animals video'
        });
    }

    async run(message, args)
    {
        let i = Math.floor((Math.random() * videos.length -1) + 1);
        message.reply("Here you go: " + videos[i]);

    }
}

module.exports = linkVideo;