module.exports = {
    name: 'ping',
    description: 'ping command',
    async execute(client, msg, args) {
        msg.channel.send('Pong!');
    },
};