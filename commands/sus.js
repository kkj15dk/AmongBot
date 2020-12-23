module.exports = {
    name: 'sus',
    description: 'fortæller om en person scannede',
    execute(client, msg, args){
        let person = 'Sofus';
        if (args.length){
            person = args.slice(0, args.length).join(' ');
        }
        let skribent = msg.author.username;
        let replies = [
            `Det kan ikke passe! Du må være imposteren ${skribent}!`,
            `Så er ${person} clear`,
            `${person} er sus`
        ]

        const index = Math.floor(Math.random() * replies.length);
        msg.channel.send(replies[index]); 
    },
};