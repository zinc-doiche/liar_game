import { ChatInputCommandInteraction } from "discord.js";
import { Game } from "../../domain/game";
import { Theme } from "../../domain/theme";
import { randomInt } from "node:crypto";


export class GameHandler {

    public async start(
        interaction: ChatInputCommandInteraction,
        game: Game,
        theme: Theme
    ) {
        const userManager = interaction.client.users;
        const userIds = game.getUsers();
        const users = [];

        const index = randomInt(0, userIds.length);
        let startIndex = randomInt(0, userIds.length - 1);

        const liarId =  userIds[index];

        startIndex += startIndex < index ? 0 : 1;
        game.setGameMeta({ liarId: liarId, theme: theme });

        for (const userId of userIds) {
            const user = await userManager.fetch(userId);
            const word = userId === liarId ? theme.mismatch : theme.word;

            users.push(user);

            await user.send({
                content:
                    `## 주제: ${theme.theme}
                    \`제시어: ${word}\` `
            });
        }

        for (let i = startIndex; i < userIds.length + startIndex; i++) {
            await users[i % userIds.length].send({
                content:
                    `## 주제: ${theme.theme}
                    \`제시어: ${word}\` `
            });
        }
    }
}