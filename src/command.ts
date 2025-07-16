import {
    ChatInputCommandInteraction,
    SlashCommandSubcommandsOnlyBuilder
} from "discord.js";

export interface Command {
    data: SlashCommandSubcommandsOnlyBuilder;
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export interface CommandHolder {
    command: Command;
}