module.exports = {
    name: 'stop',
    descripiton: 'stopper musik',
    async execute(client, msg, args){

        if (!client.player.isplaying) return msg.channel.send('Jeg spiller ikke noget musik lige nu');

        let track = await msg.client.player.stop(msg.guild.id);
        msg.channel.send('stoppede med at spille');
    },
};