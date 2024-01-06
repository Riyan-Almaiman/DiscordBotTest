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
      console.log(userMessage);
      try {
        await interaction.deferReply();

        const gptResponse = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: userMessage },
          ],
        });
        console.log(gptResponse.choices[0].message.content);
        let replyText = gptResponse.choices[0].message.content;

        // Truncate if over 2000 characters
        if (replyText.length > 2000) {
          replyText = replyText.substring(0, 1997) + "...";
        }
        await interaction.followUp(replyText);
      } catch (error) {
        console.error("Error communicating with OpenAI:", error);
        await interaction.followUp(
          "Sorry, I couldn't fetch a response from GPT-3.5."
        );
      }
    }
  });
};
