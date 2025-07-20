import { CacheType, ChatInputCommandInteraction } from "discord.js";
import { Game } from "../../domain/game";
import { Theme } from "../../domain/theme";


export class GameHandler {

    public async start(
        interaction: ChatInputCommandInteraction<CacheType>,
        game: Game,
        theme: Theme
    ) {
        const userManager = interaction.client.users
        const userIds = game.getUsers();

        for (const userId of userIds) {
            const user = await userManager.fetch(userId)
            await user.send({ content: `${theme}` });
        }
    }
}