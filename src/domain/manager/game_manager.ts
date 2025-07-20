import { Game } from "../game";


export class GameManager {

    public async join(game: Game, userId: string): Promise<boolean> {
        if(game.hasUser(userId)) {
            return false;
        }
        game.addUser(userId);
        return true;
    }
}