import { ChatInputCommandInteraction, MessageFlags, ComponentType } from "discord.js";
import { GameStorage } from "../storages/game_storage";
import { Game } from "../game";
import { GameCommandModalFactory } from "../../discord/modals/game_command_modal_factory";
import { GameManager } from "../manager/game_manager";
import { GameHandler } from "../../discord/handlers/game_handler";
import {OpenAIManager} from "../../openai/open_ai_manager";


export class GameCommandHandler {
    private gameCommandModals = new GameCommandModalFactory();
    private gameStorage = new GameStorage();
    private gameManager = new GameManager();
    private gameHandler = new GameHandler();
    private openAIManager = new OpenAIManager("gpt-o4-mini", 0.5);

    public async build(interaction: ChatInputCommandInteraction) {
        await this.gameStorage.ifPresent(async (game) => {
            await interaction.deferReply({ flags: MessageFlags.Ephemeral });
            await interaction.editReply("이미 게임이 실행 중이에요.");
        }, async () => {
            this.gameStorage.registerGame(new Game())

            await interaction.reply({
                content: "라이어게임 참가자를 모집하는 중입니다...\n",
                components: [ this.gameCommandModals.createConfirmButton() ],
                withResponse: true
            }).then(async (response) => {
                response.resource?.message?.createMessageComponentCollector({
                    componentType: ComponentType.Button,
                    time: 1000 * 60
                }).on('collect', async (interaction) => {
                    await this.gameManager.join(new Game(), interaction.user.id).then((result) => {
                        interaction.reply({
                            content: result ? "라이어게임에 참가했어요!" : "이미 참가 중인 게임이에요!",
                            flags: MessageFlags.Ephemeral
                        });
                    });
                })
            })
        });
    }

    public async start(interaction: ChatInputCommandInteraction) {
        await this.gameStorage.ifPresent(async (game) => {
            if(game.isBuilding()) {
                const userIds = game.getUsers();

                if(userIds.length > 2) {
                    const theme = await this.openAIManager.createNewTheme();

                    game.start();
                    await interaction.reply({ content: "게임을 시작합니다!" });
                    await this.gameHandler.start(interaction, game, theme);
                    return;
                }
                await interaction.reply({
                    content: "라이어게임 참가자가 충분하지 않아요. 최소 3명 이상이 필요해요.",
                    flags: MessageFlags.Ephemeral
                });
               return
            }

            await interaction.reply({ content: "이미 게임이 시작했어요.", flags: MessageFlags.Ephemeral });
        }, async () => {
            await interaction.reply({
                content: "게임이 준비되지 않았어요. 먼저 `/라이어 빌드` 명령어로 게임을 준비해주세요.",
                flags: MessageFlags.Ephemeral
            });
        })
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