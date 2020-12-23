
module.exports = {
    name: 'playlist',
    descripiton: 'spille ren playlist',
    async execute(client, msg, args){
        if (!msg.member.voice.channel) return msg.channel.send(`Du er ikke i en voice-kanal`);

        if (msg.guild.me.voice.channel && msg.member.voice.channel.id !== msg.guild.me.voice.channel.id) return msg.channel.send(`Vi er ikke i den samme kanal!`);

        if (!args[0]) return msg.channel.send(`Fortæl mig hvilken playliste jeg skal spille!`);

// laver en playliste
        var mq = [];
        
        try {
            playlist = await client.getTracks(args[0]);
        } catch(error) {
            console.error(error);
            msg.channel.send('Der gik noget galt da jeg hentede playlisten');
        }
            for (i = 0; i < playlist.length; i++){
                var sang = playlist[i];
                var artists = [];
                for (n = 0; n < playlist[i].artists.length; n++){
                    artists.push(sang.artists[n].name);
                } mq.push([sang.name.split(' (')[0].split(' -')[0], artists]);
            }

// spiller første sang, hvis bot ikke er i gang
        if (!client.player.isplaying){
            let song = await client.player.play(
                msg.member.voice.channel, 
                mq[0][0] + ' ' + mq[0][1].join(' '),
                {
                    // options
                },
                msg.author.tag
            );
        
        // sætter ræsten af sangene i queue
            for (i = 1; i < playlist.length; i++){
                let song = await client.player.addToQueue(
                    msg.guild.id, 
                    mq[i][0] + mq[i][1].join(' '),
                    {
                        // options
                    },
                    msg.author.tag
                );
            }
            console.log('Sat i queue:');
            console.log(mq);
        }

// sætter alle sange i queue hvis bot er i gang
        if (client.player.isplaying){
            for (i = 0; i < playlist.length; i++){
                let song = await client.player.addToQueue(
                    msg.guild.id, 
                    mq[i][0] + mq[i][1].join(' '),
                    {
                        // options
                    },
                    msg.author.tag
                );
            }
        }
    },
};