const Discord = require("discord.js");
const config = require("../data/config.json");

function checkDays(date) {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  return days + (days == 1 ? " day" : " days") + " ago";
}

module.exports = {
  name: "serverinfo",
  aliases: ["si", "server"],
  cooldown: 5,
  execute(client, message, args) {
    let region = {
      brazil: "Brazil",
      "eu-central": "Central Europe",
      singapore: "Singapore",
      "us-central": "U.S. Central",
      sydney: "Sydney",
      "us-east": "U.S. East",
      "us-south": "U.S. South",
      "us-west": "U.S. West",
      "eu-west": "Western Europe",
      "vip-us-east": "VIP U.S. East",
      london: "London",
      amsterdam: "Amsterdam",
      "hong-kong": "Hong Kong",
    };

    var emojis;
    if (message.guild.emojis.cache.size === 0) {
      emojis = "None";
    } else {
      emojis = message.guild.emojis.cache.size;
    }

    const embed = new Discord.MessageEmbed()
      .setAuthor(
        message.guild.name,
        message.guild.iconURL()
          ? message.guild.iconURL()
          : client.user.displayAvatarURL()
      )
      .setThumbnail(message.guild.iconURL())
      .setTimestamp()
      .addField(
        "Created",
        `${message.guild.createdAt.toString().substr(0, 15)},\n(${checkDays(
          message.guild.createdAt
        )})`,
        true
      )
      .addField("ID", message.guild.id, true)
      .addField(
        "Owner",
        `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`,
        true
      )
      .addField("Region", region[message.guild.region], true)
      .addField(
        "User Count",
        message.guild.members.cache.filter((m) => !m.user.bot).size,
        true
      )
      .addField("Member Count", message.guild.memberCount, true)
      .addField(
        "Bot Count",
        message.guild.members.cache.filter((m) => m.user.bot).size,
        true
      )
      .addField("AFK Timeout", message.guild.afkTimeout / 60 + " minutes", true)
      .addField("Roles", message.guild.roles.cache.size, true)
      .addField("Channels", message.guild.channels.cache.size, true)
      .addField("Emojis", `${emojis}/100`, true)
      .addField("Verification Level", message.guild.verificationLevel, true)
      .setColor(Math.floor(Math.random() * 16777215))
      .setFooter(`${config.copyright}`);
    message.channel.send({ embed });
  },
};
