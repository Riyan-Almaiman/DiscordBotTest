const chat = require('./interactions/chatgpt');
const hey = require('./interactions/hey');

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
        }
    });
};
