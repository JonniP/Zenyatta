const { CommandoClient } = require('discord.js-commando');
const path = require('path');
var auth = require('./auth.json');
var fs = require('fs');
const firstMessage = require('./first-message')
const roleClaim = require('./role-claims')

const bot = new CommandoClient({
	commandPrefix: '!',
	owner: '234733234209030155'
});
var entrydata = fs.readFileSync('entries.json', 'utf-8');
var entries = JSON.parse(entrydata);
bot.registry
	.registerDefaultTypes()
	.registerGroups([
		['simple', 'simple'],
		['music', 'music'],
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));

global.servers = {};

bot.on('ready', function(e) {
    console.log("Connected");
    bot.user.setActivity('Embracing Tranquility');
    roleClaim(bot)
});

bot.on('voiceStateUpdate', (oldMember, newMember) => {
    if (!bot.guilds.cache.get('279347302752321547').voice) return;
    var botconnection = bot.guilds.cache.get('279347302752321547').voice.connection;
    var botChannelName;
    if(!botconnection){
        console.log("Couldn't get bot voice connection")
        return;
    }

    if(newMember.id == '404002340174036992'){
        return;
    } else{
        if (newMember.channelID){
            if (newMember.channelID == oldMember.channelID) return;
            if (newMember.channelID == botconnection.channel.id){
                for (let i = 0; i < entries.length; i++){
                    if (newMember.id == entries[i].user){
                        dispatcher = botconnection.play('./entries/' + entries[i].sound + '.mp3');
                    }
                }
            }
        }
    }
        
});

bot.on('error', error => {
    console.log(error);
});

bot.login(auth.token);