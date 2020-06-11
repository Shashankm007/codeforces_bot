const {
    Client,
    MessageEmbed,
    version
} = require("discord.js");

let cpuStat = require("cpu-stat")
let os = require("os")
const client = new Client({
    disableEveryone: true
});

var customfooter = "**Bot made By: hashTAG_007#4677**";

module.exports = {
    name: "help",
    category: "help",
    description: "Displays all commands",
    run: async (client, message, args) => {
        cpuStat.usagePercent(function(err, percent, seconds) {
            if (err) {
                return console.log(err);
            }
            mention = `${message.author}`;
            let mid = mention.replace(/[<@!>]/g, '');

            var totalCores = cpuStat.totalCores();
            const embedStats = new MessageEmbed()
            .setColor("#94a5f7")
            .setAuthor(client.user.username, `${client.user.displayAvatarURL({ format: "png", dynamic: true })}`)
            .setDescription('Prefix: --')
            .addField('Check your missed contest', '--cfbot --missed <[-div1/-div2/-div3/div4]> <userHandle [space seperated if multiple]>')
            .addField('Check your common missed contest ', '--cfbot --team <[-div1/-div2/-div3/div4]> <space seperated user handles>')
            .addField('Generate a random Problem Set', '--cfbot --problemset <[semicolon(;) seperated Tags(IF ANY)]>')
            .addField('Check Bot info ', '--info')
            .addField('More Commands', '**COMING SOON...**')
            .addField('Add me to your server: ', '[Click here](https://discord.com/api/oauth2/authorize?client_id=717597242562838608&permissions=251968&scope=bot)')
            .addField('Bot made By: ', '**hashTAG_007#4677**')
            message.channel.send(`[ ${message.author} ] Please check your DM.`);
            client.users.fetch(mid).then(user => {
                user.send(embedStats);
            });
        });
    }
}