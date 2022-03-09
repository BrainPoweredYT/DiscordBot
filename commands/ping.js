
module.exports = {
    name: "ping",
    description: "Checks bot connection",
    async execute(interaction, client) {
        interaction.channel.send('Pinging...').then(msg => {
            let botping = Math.round(interaction.client.ws.ping);
            let ping = Math.abs(interaction.createdTimestamp - msg.createdTimestamp);

            msg.delete();
            interaction.reply({
                content: `WS: ${botping}, Ping: ${ping}`
            });
        });
    }
}