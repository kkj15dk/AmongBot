module.exports = {
    name: 'avatar',
    description: 'viser personens avatar',
    async execute(client, msg, args) {
        msg.reply(msg.author.displayAvatarURL());
    },
};