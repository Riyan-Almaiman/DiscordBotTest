const { downloadAndCompressVideo } = require('../services/youtubedownloader');

module.exports = async (interaction) => {
    await interaction.deferReply(); 

    const url = interaction.options.getString('url');

    try {
        const compressedFilePath = await downloadAndCompressVideo(url);
        await interaction.editReply({ content: 'Video downloaded.', files: [compressedFilePath] });
    } catch (error) {
        await interaction.editReply({ content: `${error}` });
    }
};
