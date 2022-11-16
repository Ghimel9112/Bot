const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const fetch = require("node-fetch");
require("discordjs-activity");

module.exports = {
  name: "youtube",
  aliases: ["youtubetoghether", "yt", "ytt"],
  category: "💰 Premium",
  description: "Starts an youtube toghether session!",
  usage: "youtube toghether",
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      let channel = message.member.voice.channel;
      if (!channel)
        return message.channel.send(
          "you have to be in a voice channel to use this command!"
        );

      fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
        method: "POST",
        body: JSON.stringify({
          max_age: 86400,
          max_uses: 0,
          target_application_id: "755600276941176913",
          target_type: 2,
          temporary: false,
          validate: null,
        }),
        headers: {
          Authorization: `Bot ${client.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((invite) => {
          if (!invite.code)
            return message.channel.send(
              "Sadly i can't start a Youtube Toghether session!"
            );
          let embed = new MessageEmbed()
            .setAuthor(
              "YouTube Together",
              "https://cdn.discordapp.com/emojis/749289646097432667.png?v=1"
            )
            .setColor("DARK_RED").setDescription(`
  Using **YouTube Together** you can watch YouTube with your friends in a Voice Channel. Click the *YouTube Together* button to join in!
  
  ⚠ **Note:** This only works in Desktop
  `);

          const button = new MessageButton()

            .setStyle("LINK")

            .setURL(`https://discord.com/invite/${invite.code}`)

            .setLabel("Youtube Toghether");

          const row = new MessageActionRow().addComponents(button);

          message.channel.send({ embeds: [embed], components: [row] });
        });
    } catch (e) {
      console.log(e);
    }
  },
};
