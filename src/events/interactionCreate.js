const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
	    console.log(`${client.user.tag} 준비 완료!`);
	},
};