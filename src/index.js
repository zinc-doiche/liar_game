const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('../config.json');
const { getCommands } = require('./loaders/command_loader.js')


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = getCommands();

client.once(Events.ClientReady, readyClient => {
	console.log(`${readyClient.user.tag} 준비 완료!`);
});

client.login(token);