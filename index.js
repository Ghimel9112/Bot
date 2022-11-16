
/**********************************************************
 * @INFO  [TABLE OF CONTENTS]
 *********************************************************/



/**********************************************************
 * @param {1} Import_Modules for this FIle
 *********************************************************/
const Discord = require("discord.js");
const colors = require("colors");
const enmap = require("enmap"); 
const fs = require("fs"); 
const config = require("./botconfig/config.json");
const { prefix } = require("./botconfig/config.json");
const db = require('quick.db');
const message = require('discord.js');

/**********************************************************
 * @param {2} CREATE_THE_DISCORD_BOT_CLIENT with some default settings
 *********************************************************/
const client = new Discord.Client({
  fetchAllMembers: false,
  failIfNotExists: false,
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users"],
    repliedUser: false,
  },
  partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
  intents: [ 
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});


/**********************************************************
 * @param {5} create_the_languages_objects to select via CODE
 *********************************************************/
client.la = { }
var langs = fs.readdirSync("./languages")
for(const lang of langs.filter(file => file.endsWith(".json"))){
  client.la[`${lang.split(".json").join("")}`] = require(`./languages/${lang}`)
}
Object.freeze(client.la)
//function "handlemsg(txt, options? = {})" is in /handlers/functions 


//status*
client.once("ready", () => {
  const arrayOfStatus = [
    `Need help? Use: ${prefix}help`,
    `Prefix: ${prefix}`,
    `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Users!`,
    `${client.guilds.cache.size} Servers!`,
    `Raptor Kingdom`,
    `The Bot Developer: Ghimel`,
    `Co-Owner: Wolf the dev`,
    `Raptor.`,
    `Enjoy using this bot! :)`,
    `The bot it's still in development!!!Do not expect high quality results!!!`,
  ];

  let index = 0;
  setInterval(() => {
    if (index === arrayOfStatus.length) index = 0;
    const status = arrayOfStatus[index];
    client.user.setActivity(status, { type: "WATCHING" });
    index++;
  }, 10000);
});

/**********************************************************
 * @param {6} Raise_the_Max_Listeners to 25 (default 10)
 *********************************************************/
client.setMaxListeners(25);
require('events').defaultMaxListeners = 25;



/**********************************************************
 * @param {8} LOAD_the_BOT_Functions 
 *********************************************************/
//those are must haves, they load the dbs, events and commands and important other stuff
function requirehandlers(){
  client.basicshandlers = Array(
    "extraevents", "loaddb", "clientvariables", "command", "events", "erelahandler", "slashCommands"
  );
  client.basicshandlers.forEach(handler => {
    try{ require(`./handlers/${handler}`)(client); }catch (e){ console.log(e.stack ? String(e.stack).grey : String(e).grey) }
  });
}requirehandlers();
module.exports.requirehandlers = requirehandlers;

/**********************************************************
 * @param {9} Login_to_the_Bot
 *********************************************************/
setTimeout(()=>{
  client.login(process.env.token || config.token);
}, 500)

