const chat = require("./interactions/chatgpt");
const hey = require("./interactions/hey");
const downloadYoutube = require("./interactions/youtube");

module.exports = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    switch (interaction.commandName) {
      case "hey":
        await hey(interaction);
        break;
      case "chat":
        await chat(interaction);
        break;
      case "downloadyoutube":
        await downloadYoutube(interaction);
        break;
    }
  });
};
