import {ActionRowBuilder, ButtonStyle, ButtonBuilder} from "discord.js";


export class GameCommandModalFactory {

    public createConfirmButton(): ActionRowBuilder<ButtonBuilder> {
        return new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('join')
                    .setLabel('참가하기')
                    .setStyle(ButtonStyle.Success)
            );
    }
}