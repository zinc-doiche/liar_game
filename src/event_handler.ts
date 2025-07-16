import {Client, Events} from "discord.js";

export interface EventHandler {
    name: Events;
    once: boolean;
    execute: (...args: any[]) => void;
}