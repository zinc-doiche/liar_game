import { Game } from "../game";


export class GameStorage {
    private game: Game | undefined;

    public async ifPresent(
        callback: (game: Game) => Promise<void>,
        fallback: () => Promise<void> = () => Promise.resolve()
    ): Promise<void> {
        if (this.game) {
            await callback(this.game);
        } else {
            await fallback();
        }
    }

    public isValid() {
        return this.game !== undefined;
    }

    public invalidate() {
        this.game = undefined;
    }

    public registerGame(game: Game) {
        this.game = game;
    }
}