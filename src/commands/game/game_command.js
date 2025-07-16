const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('라이어')
	.setDescription('라이어게임 기본 명령어')
	.addStringOption(option => option
		.setName('명령')
		.setDescription('명령을 선택합니다.')
		.setRequired(true)
		.addChoices(
			{ name: '빌드', value: 'build' },
			{ name: '시작', value: 'start' },
		)),
	execute
};


async function execute(interaction) {
	await interaction.reply('Pong!');
}