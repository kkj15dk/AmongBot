// Bot siger hej
    console.log('beep boop');

// Opstart
    // Discord.js
    const Discord = require('discord.js');
    const client = new Discord.Client();

    // Spotify
    var { getData, getPreview, getTracks } = require("spotify-url-info");
    client.getData = getData;
    client.getPreview = getPreview;
    client.getTracks = getTracks;

    // Delay
    const delay = require('delay');

    // Konfiguration
    const config = require('./config.json')
    require('dotenv').config();

    // Man kan spille musik
    const { Player } = require('discord-music-player');
    const player = new Player(client, {
        leaveOnEnd: true,
        leaveOnStop: false,
        leaveOnEmpty: true,
        timeout: 0,
        quality: 'high',
    });
    client.player = player;
    // client.playerOptions = {
    //     uploadDate: 'none', // 'hour/today/week/month/year'
    //     duration: 'none', // 'short/long'
    //     sortBy: 'relevance' // 'relevance/date/view count/rating'
    // }
    client.player.isplaying = false;

// Der hvor kommandoer ligger
    const fs = require('fs');
    client.commands = new Discord.Collection();
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Database til musikquiz-info
    const Datastore = require('nedb');
    const mqdata = new Datastore('mqdata.db');
    mqdata.loadDatabase();

// Bot fortæller hvordan det går
client.on('ready', readyDiscord);
async function readyDiscord() {
    console.log('Jeg er iblandt jer');
    // Få data om servere botten er på
    var guildIdList = [];
        client.guilds.cache.each(guildId => 
            guildIdList.push(guildId.id)
        );
    console.log('servere jeg er på: ' + guildIdList.join(', '));
}

client.on('reconnecting', reconnectingDiscord);
function reconnectingDiscord() {
    console.log('Syg verden vi lever i');
}
client.on('disconnect', disconnectDiscord);
function disconnectDiscord(){
    console.log('Jeg er ikke længere iblandt jer');
}

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', gotMessage);

async function gotMessage(msg) {

    // if (msg.channel.id === config.testId && !msg.author.bot){
    
    // }
    if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    if (!client.commands.has(commandName)){
        msg.channel.send('Den kommando findes ikke');
        return;
    }

    try {
        client.player.isplaying = client.player.isPlaying(msg.guild.id);
        command.execute(client, msg, args);
    } catch(error){
        console.error(error);
        msg.reply('Der gik noget galt med den kommando');
    }
};

// Bot logger in
client.login(process.env.BOTTOKEN);