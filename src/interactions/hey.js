async function heyCommand(interaction) {
    try {
        await interaction.reply("Hey!");
    } catch (error) {
        console.error("Error in 'hey' command:", error);
        interaction.reply("Sorry, I couldn't process your request.").catch(console.error);
    }
}

module.exports = heyCommand;
