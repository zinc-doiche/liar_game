import { ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { ModalManager } from "../../discord/modals/modal_manager";
import { GameStorage } from "../storages/game_storage";
import { Game } from "../game";


export class GameCommandHandler {
    private modalManager = new ModalManager();
    private gameStorage = new GameStorage();

    public async build(interaction: ChatInputCommandInteraction) {
        await this.gameStorage.ifPresent(async (game) => {
            await interaction.deferReply({ flags: MessageFlags.Ephemeral });
            await interaction.editReply("이미 게임이 실행 중이에요.");
        }, async () => {
            this.gameStorage.registerGame(new Game())
            await interaction.deferReply();
            await interaction.editReply("라이어게임 참가자를 모집하는 중입니다...");
        });
    }

    public async start(interaction: ChatInputCommandInteraction) {
        await interaction.reply({ content: interaction.options.getSubcommand(), flags: MessageFlags.Ephemeral })
    }

    public async continueGame(interaction: ChatInputCommandInteraction) {
        await interaction.reply({ content: interaction.options.getSubcommand(), flags: MessageFlags.Ephemeral })
    }

    public async stop(interaction: ChatInputCommandInteraction) {
        await this.gameStorage.ifPresent(async (game) => {
            this.gameStorage.invalidate();
            await interaction.deferReply();
            await interaction.editReply("게임을 종료했어요.")
        }, async () => {
            await interaction.reply({ content: "게임 중이 아니에요.", flags: MessageFlags.Ephemeral })
        })
    }
}