const commando = require('discord.js-commando');
var fs = require('fs');

var duplicates = [];
var con;


function getQuotes(){
    return fs.readdirSync('./quotes');
}

function Play(connection, message, quote)
{
    dispatcher = connection.play('./quotes/' + quote);
}

function filterQuotes(quotelist, arg){
    let filteredQuotes = [];
    for (let i = 0; i < quotelist.length; i++)
    {
        if (quotelist[i].includes(arg))
        {
            filteredQuotes[filteredQuotes.length] = quotelist[i];
        }
    }
    return filteredQuotes;
}

function filterByDuplicates(quotes, duplicates){
    let filteredQuotes = [];
    if (duplicates.length > 10) duplicates.shift();
    for (let i = 0; i < quotes.length; i++)
    {
        if (!duplicates.includes(quotes[i])){
            filteredQuotes.push(quotes[i]);
        }
    }
    return filteredQuotes;
}


class playQuote extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'quote',
            group: 'music',
            memberName: 'quote',
            description: 'Plays a quote'
        });
    }

    async run(message, args)
    {
        if (message.member.voice.channel)
        {
            var quotes = getQuotes();

            if (args != "")
            {
                quotes = filterQuotes(quotes, args);
                if (duplicates.length > 10) duplicates.shift();
            } else {
                quotes = filterByDuplicates(quotes, duplicates);
                console.log(duplicates);
            }
            if (quotes.length == 0)
            {
                message.reply("No quotes from someone called " + args + ". Try a different name");
                return;
            }
            var quote = quotes[Math.floor(Math.random() * quotes.length)];
            duplicates.push(quote);
            //console.log("Chosen quote is " + quote);
            if (!message.guild.voiceConnection)
            {
                message.member.voice.channel.join()
                .then(connection =>{
                    con = connection;
                    Play(connection, message, quote);
                })
            }
            else{
                if (!con){
                    con = message.member.voice.channel.connection;
                }
                Play(con, message, quote);
            }
        }
        else
        {
            message.reply("You are not in a voice channel, weakling!");
        }
    }
}

module.exports = playQuote;