const {
  MessageEmbed
} = require("discord.js");
const config = require(`${process.cwd()}/botconfig/config.json`);
const ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: "defaultequalizer",
  category: "💰 Premium",
  aliases: ["default-equalizer", "defaulteq", "default-eq"],
  cooldown: 10,
  usage: "equalizer",
  description: "Toggles if it should use the Default Equalizer on 1. Track start or not! [Default: false]",
  memberpermissions: ["ADMINISTRATOR"],
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {
      client.settings.ensure(message.guild.id, {
        defaulteq: false,
      });
      
      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "defaulteq"), "defaulteq");
      
      return message.reply({embeds : [new MessageEmbed()
        .setFooter(es.footertext, es.footericon).setColor('DARK_RED').setThumbnail(es.thumb ? es.footericon : null)
        .setTitle(eval(client.la[ls]["cmds"]["settings"]["defaultequalizer"]["variable1"]))
        .setDescription(eval(client.la[ls]["cmds"]["settings"]["defaultequalizer"]["variable2"]))
      ]});
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply({embeds :[new MessageEmbed()
        .setFooter(es.footertext, es.footericon).setColor(es.wrongcolor)
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(`\`\`\`${String(e.message ? e.message : e).substr(0, 2000)}\`\`\``)
      ]});
    }
  }
}
