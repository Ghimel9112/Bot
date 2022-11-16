const {
  MessageEmbed, MessageActionRow
} = require("discord.js");
const { MessageButton } = require('discord.js')
module.exports = {
  name: "support",
  category: "🔰 Info",
  aliases: ["invite"],
  usage: "invite",
  description: "Sends you the Support Server Link",
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {
      let button_public_invite = new MessageButton().setStyle('LINK').setLabel('Top.gg').setURL("https://top.gg/bot/809214468092461137")
      let button_support_dc = new MessageButton().setStyle('LINK').setLabel('Support Server').setURL("discord.io/RaptorKindgom")
      let button_invite = new MessageButton().setStyle('LINK').setLabel('Invite the Bot').setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
      //array of all buttons
      const allbuttons = [new MessageActionRow().addComponents([button_public_invite, button_support_dc, button_invite])]
      message.reply({
        embeds: [new MessageEmbed()
          .setColor('DARK_RED')
          .setTitle(":tickets: You need help? JOIN OUR SUPPORT SERVER")
          .setURL("https://discord.com/api/oauth2/authorize?client_id=809214468092461137&permissions=8&scope=bot%20applications.commands")],
        components: allbuttons
      });
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply({embeds: [new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(`\`\`\`${String(e.message ? e.message : e).substr(0, 2000)}\`\`\``)
      ]});
    }
  }
}

