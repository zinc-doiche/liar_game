import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { token } from '../config.json';
import { registerCommands, getCommands } from './loaders/command_loader';
import { registerEvent } from './loaders/event_loader';
import { Command } from "./command";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commands: Collection<string, Command> = getCommands();

registerEvent(client);
registerCommands(commands, client);


client.login(token);
