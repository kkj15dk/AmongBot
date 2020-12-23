module.exports = {
    name: 'gif',
    description: 'gif command',
    async execute(client, msg, args){
        const fetch = require('node-fetch');
        let searchTerm = 'amongus';
        let numResults = '8';
            if(args.length){
                searchTerm = args.join(' ');
            }

        let url = `https://api.tenor.com/v1/search?q=${searchTerm}&key=${process.env.TENORKEY}&ContentFilter=high&limit=${numResults}`;
        let response = await fetch(url);
        let json = await response.json();
        const index = Math.floor(Math.random() * json.results.length);
        msg.channel.send(json.results[index].url);
        // console.log(searchTerm, url);
    },
};