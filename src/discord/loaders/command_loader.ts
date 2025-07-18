import fs from 'node:fs';
import path from 'node:path';
import { Collection, Events, MessageFlags, Client, Interaction } from 'discord.js';
import { Command } from "../../domain/command";


export class CommandLoader {

    public registerCommands(commands: Collection<string, Command>, client: Client) {
        client.on(Events.InteractionCreate, async (interaction: Interaction) => {
            if (!interaction.isChatInputCommand()) {
                return;
            }

            const command: Command | undefined = commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
                } else {
                    await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
                }
            }
        });
    }

    public getCommands(): Collection<string, Command> {
        const collection = new Collection<string, Command>();

        const foldersPath = path.join(__dirname, '../commands');
        const commandFolders = fs.readdirSync(foldersPath);

        for (const folder of commandFolders) {
            const commandsPath = path.join(foldersPath, folder);
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath).default as Command;

                if(command) {
                    console.log(`[Command] '${command.data.name}' 등록됨`);
                    collection.set(command.data.name, command);
                }
            }
        }

        return collection;
    }
}