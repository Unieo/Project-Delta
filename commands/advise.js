const Discord = require("discord.js");
const request = require("superagent");
const config = require("../data/config.json");

module.exports = {
  name: "advise",
  aliases: ["adv"],
  execute(message) {
    request.get("http://api.adviceslip.com/advice").end((err, res) => {
      if (!err && res.status === 200) {
        try {
          JSON.parse(res.text);
        } catch (e) {
          return message.channel.send("An error occurred...");
        }
        const advice = JSON.parse(res.text);

        const embed = new Discord.MessageEmbed()
          .setTitle("Your Advise, Pal")
          .setColor(Math.floor(Math.random() * 16777215))
          .addField(advice.slip.advice)
          .setTimestamp()
          .setFooter(`${config.copyright}`);
        message.channel.send({ embed });
      } else {
        console.error(`REST call failed: ${err}, status code: ${res.status}`);
      }
    });
  },
};
