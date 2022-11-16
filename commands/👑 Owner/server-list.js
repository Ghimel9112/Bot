const {
    MessageEmbed
  } = require(`discord.js`);
  var config = require(`${process.cwd()}/botconfig/config.json`);
  var emoji = require(`${process.cwd()}/botconfig/emojis.json`);
  module.exports = {
    name: `server-list`,
    type: "info",
    category: `👑 Owner`,
    aliases: [`servers`],
    description: `See the guilds the bot is in`,
    usage: ``,
    run: async (client, message, args, cmduser, text, prefix) => {

		let i0 = 0;
		let i1 = 10;
		let page = 1;
       
    if (!config.ownerIDS.some(r => r.includes(message.author.id)))
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable1"]))
          .setDescription(eval(client.la[ls]["cmds"]["owner"]["changestatus"]["variable2"]))
        ]
      });
		let description = 
        `${client.guilds.cache.size}\n\n`+
		client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
			.map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount}`)
			.slice(0, 10)
			.join("\n");

		const embed = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 512, dynamic: true, format: 'png' }))
			.setColor('DARK_RED')
			.setFooter(client.user.username)
			.setTitle(`${page}/${Math.ceil(client.guilds.cache.size/10)}`)
			.setDescription(description);

		const msg = await message.channel.send({ embeds: [embed] });
        
		await msg.react("⬅");
		await msg.react("➡");
		await msg.react("❌");

		const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

		collector.on("collect", async(reaction) => {

			if(reaction._emoji.name === "⬅") {

				// Updates variables
				i0 = i0-10;
				i1 = i1-10;
				page = page-1;
                
				// if there is no guild to display, delete the message
				if(i0 < 0){
					return msg.delete();
				}
				if(!i0 || !i1){
					return msg.delete();
				}
                
				description = `${client.guilds.cache.size}\n\n`+
				client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
					.map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount}`)
					.slice(i0, i1)
					.join("\n");

				// Update the embed with new informations
				embed.setTitle(`${page}/${Math.round(client.guilds.cache.size/10)}`)
					.setDescription(description);
            
				// Edit the message 
				msg.edit({ embeds: [embed]});
            
			}

			if(reaction._emoji.name === "➡"){

				// Updates variables
				i0 = i0+10;
				i1 = i1+10;
				page = page+1;

				// if there is no guild to display, delete the message
				if(i1 > client.guilds.cache.size + 10){
					return msg.delete();
				}
				if(!i0 || !i1){
					return msg.delete();
				}

				description = `${client.guilds.cache.size}\n\n`+
				client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
					.map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount}`)
					.slice(i0, i1)
					.join("\n");

				// Update the embed with new informations
				embed.setTitle(`${page}/${Math.round(client.guilds.cache.size/10)}`)
					.setDescription(description);
            
				// Edit the message 
				msg.edit({ embeds: [embed] });

			}


			// Remove the reaction when the user react to the message
			await reaction.users.remove(message.author.id);

		});
    }
}