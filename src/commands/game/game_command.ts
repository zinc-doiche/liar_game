import { SlashCommandBuilder, MessageFlags, CommandInteraction, ChatInputCommandInteraction,} from 'discord.js';
import { createModal } from '../../modals/modal_manager';

export { data, execute };


const data = new SlashCommandBuilder()
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

const execute = async (interaction: CommandInteraction) => {
    // ChatInputCommandInteraction 타입으로 단언
    const chatInteraction = interaction as ChatInputCommandInteraction;
    switch (chatInteraction.options.getSubcommand()) {
        case '빌드':
            await build(chatInteraction);
            break;
        case '시작':
            await start(chatInteraction);
            break;
        case '컨티뉴':
            await continueGame(chatInteraction);
            break;
        case '종료':
            await stop(chatInteraction);
            break;
    }
};


async function build(interaction: ChatInputCommandInteraction) {
    await interaction.showModal(createModal());
}

async function start(interaction: ChatInputCommandInteraction) {
    await interaction.reply({ content: interaction.options.getSubcommand(), flags: MessageFlags.Ephemeral })
}

async function continueGame(interaction: ChatInputCommandInteraction) {
    await interaction.reply({ content: interaction.options.getSubcommand(), flags: MessageFlags.Ephemeral })
}

async function stop(interaction: ChatInputCommandInteraction) {
    await interaction.reply({ content: interaction.options.getSubcommand(), flags: MessageFlags.Ephemeral })
}