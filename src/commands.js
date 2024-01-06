const { REST, Routes } = require('discord.js');
require('dotenv').config();

const commands = [{
    name: 'hey',
    description: 'Replied with hey'
}];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);



module.exports = async () => {
    try {
        await rest.put(
            Routes.applicationGuildCommands(process.env.BOT_ID, process.env.SERVER_ID), { body: commands }
        );
        console.log('Commands registered successfully');
    } catch (error) {
        console.error("Error: " + error);
    }
};