module.exports = client => {
    client.on('messageCreate', message => {


        if (!message.author.bot & message.content==='Secret') {
            message.reply("Secret Message");
        }


    });








};
