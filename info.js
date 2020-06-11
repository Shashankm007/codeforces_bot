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

module.exports = {
    name: "info",
    category: "info",
    description: "Sends detailed info about the client",
    run: async (client, message, args) => {
        cpuStat.usagePercent(function(err, percent, seconds) {
            if (err) {
                return console.log(err);
            }

            var totalCores = cpuStat.totalCores();
            const embedStats = new MessageEmbed()
            .setColor("#94a5f7")
            .setAuthor(client.user.username, `${client.user.displayAvatarURL({ format: "png", dynamic: true })}`)
            //.setThumbnail(`${client.user.displayAvatarURL({ format: "png", dynamic: true })}`)
            .addField('Add me to your server: ', '[Click here](https://discord.com/api/oauth2/authorize?client_id=717597242562838608&permissions=251968&scope=bot)')
            
            .addField(`\u200B`, "Developers:") // Title
            .addField("hashTag007", `\`Twitter @_hashtag007 \nDiscord: @hashTAG_007#4677\``, true)
            .addField(`\u200B`, `\u200B`, true) // PlaceHolder

            .addField(`\u200B`, "Bot Status:") // Title
            .addField("About", `\`This bot notifies about new contests.\``)
            .addField("Uptime ", `\`${client.uptime}ms\``, true)
            .addField("API Latency", `\`${(client.ws.ping)}ms\``, true)
            .addField(`\u200B`, `\u200B`, true) // PlaceHolder


            .addField(`\u200B`, "Discord Status:") // Title
            .addField("Users", `\`${client.users.cache.size}\``, true)
            .addField("Servers", `\`${client.guilds.cache.size}\``, true)
            .addField("Channels ", `\`${client.channels.cache.size}\``, true)

            .addField(`\u200B`, "Version:") // Title
            .addField("Node", `\`${process.version}\``, true)
            .addField("Discord.js", `\`v${version}\``, true)
            .addField(`\u200B`, `\u200B`, true) // PlaceHolder


            .addField(`\u200B`, "VPS Status:") // Title
            .addField("CPU", `\`${os.cpus().map(i => `${i.model}`)[0]}\``)
            .addField("Total Cores", `\`${totalCores}\``, true)
            .addField("CPU Usage", `\`${percent.toFixed(2)}%\``, true)
            .addField("Arch", `\`${os.arch()}\``, true)
            .addField("Platform", `\`${os.platform()}\``, true)
            .addField("Mem Usage", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\``, true)
            .addField(`\u200B`, `\u200B`, true); // PlaceHolder

            message.channel.send(embedStats)
        });
    }
}