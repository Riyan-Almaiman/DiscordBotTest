const { Client, IntentsBitField } = require("discord.js");
const initializeCommands = require("./commands");
require("dotenv").config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

require("./events/messageCreate")(client);
require("./events/interactions")(client);

initializeCommands()
  .then(() => {
    console.log("Commands initialized successfully");
  })
  .catch((err) => {
    console.error("Failed to initialize commands:", err);
  });

client.on("ready", (bot) => {
  console.log(`${bot.user.tag} is online`);
});

client.login(process.env.TOKEN);



