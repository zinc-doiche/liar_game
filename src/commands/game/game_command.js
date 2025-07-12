const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('라이어')
		.setDescription('라이어게임 기본 명령어'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};