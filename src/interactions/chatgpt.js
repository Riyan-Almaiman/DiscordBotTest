const getOpenAIResponse = require("../services/openai");

async function chatCommand(interaction) {
    const userMessage = interaction.options.getString("message");
    try {
        await interaction.deferReply();
        const replyText = await getOpenAIResponse(userMessage);
        const response = replyText.length > 2000 ? replyText.substring(0, 1997) + "..." : replyText;
        await interaction.followUp(response);
    } catch (error) {
        console.error("Error in 'chat' command:", error);
        interaction.reply("Sorry, I couldn't process your request.").catch(console.error);
    }
}

module.exports = chatCommand;
