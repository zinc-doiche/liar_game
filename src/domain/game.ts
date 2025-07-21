import { GameMeta } from "./game_meta";


export class Game {
    private state: State = State.BUILDING;
    private users: Array<string> = []
    private gameMeta: GameMeta | undefined;

    public getGameMeta(): GameMeta {
        return this.gameMeta!!;
    }

    public setGameMeta(gameMeta: GameMeta) {
        this.gameMeta = gameMeta;
    }

    public getUsers(): Array<string> {
        return this.users;
    }

    public hasUser(userId: string): boolean {
        return this.users.includes(userId);
    }

    public addUser(userId: string): void {
        this.users.push(userId);
    }

    public isBuilding(): boolean {
        return this.state === State.BUILDING;
    }

    public isWaiting(): boolean {
        return this.state === State.WAITING;
    }

    public start(): void {
        this.state = State.STARTED;
    }

    public wait(): void {
        this.state = State.WAITING;
    }
}

export enum State {
    BUILDING,
    STARTED,
    WAITING
}