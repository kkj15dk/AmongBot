module.exports = {
    name: 'skip',
    description: 'kobler botten fra voice-kanalen',
    async execute(client, msg, args) {
        if (!msg.guild.me.voice.channel) return msg.channel.send('Jeg er ikke i nogen voice-kanal');
        if (!msg.member.voice.channel) return msg.channel.send('Du er ikke i nogen voice-kanal');
        if (msg.member.voice.channel.id !== msg.guild.me.voice.channel.id) return msg.channel.send(`Vi er ikke i den samme kanal!`);
        if (!client.player.isplaying) return msg.channel.send('Jeg spiller ikke noget musik lige nu');

        if (args[0] === 'alt'){
            client.player.stop(msg.guild.id);
        }
        if (client.player.getQueue(msg.guild.id).songs.length === 1) return client.player.stop(msg.guild.id);

        if (client.player.isplaying){
            client.player.skip(msg.guild.id);
        }
    },
};