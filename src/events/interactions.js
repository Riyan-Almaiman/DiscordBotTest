const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI });

module.exports = (client) => {
  client.on("interactionCreate", (interaction) => {
    if (interaction.isChatInputCommand()) {
      if (interaction.commandName === "hey") {
        interaction.reply("Hey!");
      }
    }
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "chat") {
      const userMessage = interaction.options.getString("message");

      try {
        await interaction.deferReply();
        const replyText = await getOpenAIResponse(userMessage);

        const response =
          replyText.length > 2000
            ? replyText.substring(0, 1997) + "..."
            : replyText;

        await interaction.followUp(response);
        
      } catch (error) {
        console.error("Error:", error);
        await interaction.followUp("Sorry, I couldn't process your request.");
      }
    }
  });
};
