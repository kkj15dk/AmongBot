module.exports = {
    name: 'queue',
    descripiton: 'giver queuen',
    async execute(client, msg, args){

        if (!client.isPlaying) return msg.channel.send('Jeg spiller ikke noget musik...');
    
        console.log(client.player.getQueue(msg.guild.id));
    },
};