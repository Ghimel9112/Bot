const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
let os = require("os");
let cpuStat = require("cpu-stat");
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const { duration, handlemsg } = require(`${process.cwd()}/handlers/functions`);
const { connected } = require("process");
module.exports = {
  name: "bugreport",
  aliases: ["reportbug", "rb", "br"],
  category: "🔰 Info",
  description: "Reports a bug",
  usage: "bugreport",
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      const channel = client.channels.cache.get("905586744773197824");
      const channel2 = client.channels.cache.get("906961106537447464");
      const query = args.join(" ");
      if (!query)
        return message.reply({ content: "Please provide a bug to report!" });

      const reportEmbed = new MessageEmbed()
        .setTitle("New Bug Reported!")
        .addField("Report Author", message.author.toString(), true)
        .addField("Bug Was Reported From", message.guild.name, true)
        .addField("Bug", query)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setColor("DARK_RED")
        .setTimestamp();

      const thankYouEmbed = new MessageEmbed()
        .setTitle("Thank you for the report.")
        .setDescription("The owner will look in to it ASAP.")
        .setColor("DARK_RED");

      channel.send({ embeds: [reportEmbed] }).catch((e) => {
        console.log(e);
      });
      channel2.send({ embeds: [reportEmbed] }).catch((e) => {
        console.log(e);
      });
      message.channel.send({ embeds: [thankYouEmbed] }).catch((e) => {
        console.log(e);
      });
    } catch (e) {
      console.log(e);
    }
  },
};
