module.exports = {
    name: 'spil',
    descripiton: 'spiller musik',
    async execute(client, msg, args){
        if (!msg.member.voice.channel) return msg.channel.send(`Du er ikke i en voice-kanal`);

        if (msg.guild.me.voice.channel && msg.member.voice.channel.id !== msg.guild.me.voice.channel.id) return msg.channel.send(`Vi er ikke i den samme kanal!`);

        if (!args[0]) return msg.channel.send(`Fortæl mig hvilken sang jeg skal spille!`);

        if (client.player.isplaying){
            let song = await client.player.addToQueue(msg.guild.id, 
            args.join(' '),
            {
                // options
            },
            msg.author.tag);

            song = song.song;
            msg.channel.send(`${song.name} blev tilføjet til queue! - foreslået af ${song.requestedBy.split('#')[0]}`);
        } else {
            let song = await client.player.play(msg.member.voice.channel, 
            args.join(' '),
            {
                // options
            },
            msg.author.tag);

            song = song.song;
            msg.channel.send(`Spiller nu ${song.name}! - foreslået af ${song.requestedBy.split('#')[0]}`);
        }
    },
};