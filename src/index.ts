import { Client, GatewayIntentBits } from 'discord.js';
import { token, openAIToken } from '../config.json';

process.env.OPENAI_API_KEY = openAIToken;

import { CommandLoader } from './discord/loaders/command_loader';
import { EventLoader } from './discord/loaders/event_loader';


const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commandLoader = new CommandLoader();
const eventLoader = new EventLoader();

eventLoader.registerEvent(client);
commandLoader.registerCommands(commandLoader.getCommands(), client);


client.login(token);