const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('../config.json');
const { registerCommands, getCommands } = require('./loaders/command_loader.js')
const { registerEvent } = require('./loaders/event_loader.js')


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

registerEvent(client);

client.commands = getCommands();
registerCommands(client);

client.login(token);