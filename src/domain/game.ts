

export class Game {
    private state: State = State.BUILDING;
    private users: Array<string> = []

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