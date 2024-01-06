module.exports = client => {


    client.on('interactionCreate', interaction => {
        if (interaction.isChatInputCommand()) {
            if (interaction.commandName === "hey") {
                interaction.reply("Hey!");
            }
        }
    });

    
};
