const { REST, Routes } = require("discord.js");
require("dotenv").config();

const commands = [
  {
    name: "hey",
    description: "Replies with hey",
  },
  {
    name: "chat",
    description: "Chat with GPT-3.5",
    options: [
      {
        type: 3,
        name: "message",
        description: "Your message to GPT-3.5",
        required: true,
      },
    ],
  },
  {
    name: "downloadyoutube",
    description: "Download YouTube video (Max 5 minutes)",
    options: [
      {
        type: 3, 
        name: "url",
        description: "The YouTube video URL",
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

module.exports = async () => {
  try {
    await rest.put(
      Routes.applicationCommands(process.env.BOT_ID), 
      { body: commands }
    );
    console.log("Global commands registered successfully");
  } catch (error) {
    console.error("Error: " + error);
  }
};
