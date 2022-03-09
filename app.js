const Discord = require('discord.js');
const Client = require('./client/client');
const config = require('./config.json');
const secret = require('./secret.json');
const fs = require('fs');

const client = new Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('js'));

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

//
// Logging
//
const Kailogs = require('kailogs');
const logger = new Kailogs.logger('./logs');
new Kailogs.exceptions(logger).handle();
new Kailogs.rejections(logger).handle();

logger.on('error', (err) => {
    // Do something
});

client.login(secret.discord.token);

client.on('ready', () => {
    logger.info('Connected to Discord');
    client.guilds.fetch('950861050356576288').then(guild => {
        guild.commands.set(client.commands);
        logger.info('Updated guild commands');
    });
});

client.on('interactionCreate', async interaction => {
    const command = client.commands.get(interaction.commandName.toLowerCase());
    command.execute(interaction, client);
    logger.info(`Ran command: ${command.name}`);
});

// client.on('messageCreate', message => {
//     logger.message(message.channel.name, message.author.username, message.content);
// })