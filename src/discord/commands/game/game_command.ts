import { SlashCommandBuilder, MessageFlags, CommandInteraction, ChatInputCommandInteraction,} from 'discord.js';
import { Command } from "../../command";
import {GameCommandHandler} from "../../../domain/handlers/game_command_handler";


class GameCommand implements Command {
    public handler = new GameCommandHandler();

    public data = new SlashCommandBuilder()
        .setName('라이어')
        .setDescription('라이어게임 기본 명령어')
        .addSubcommand(subCommand => subCommand
            .setName('빌드')
            .setDescription('게임을 준비합니다.'))
        .addSubcommand(subCommand => subCommand
            .setName('시작')
            .setDescription('게임을 시작합니다.'))
        .addSubcommand(subCommand => subCommand
            .setName('컨티뉴')
            .setDescription('게임을 계속 진행합니다.'))
        .addSubcommand(subCommand => subCommand
            .setName('종료')
            .setDescription('게임을 끝냅니다.'));

    public async execute(interaction: CommandInteraction) {
        const chatInteraction = interaction as ChatInputCommandInteraction;

        switch (chatInteraction.options.getSubcommand()) {
            case '빌드':
                await this.handler.build(chatInteraction);
                break;
            case '시작':
                await this.handler.start(chatInteraction);
                break;
            case '컨티뉴':
                await this.handler.continueGame(chatInteraction);
                break;
            case '종료':
                await this.handler.stop(chatInteraction);
                break;
        }
    };
}


const command = new GameCommand();

export default command;