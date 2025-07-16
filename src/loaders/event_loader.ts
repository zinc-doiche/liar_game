import fs from 'node:fs';
import path from 'node:path';
import {Client, ClientEvents} from 'discord.js';
import {EventHandler} from "../event_handler";

export function registerEvent(client: Client) {
    const eventsPath = path.join(__dirname, '../events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const eventHandler = require(filePath) as EventHandler;
        let event = eventHandler.name as keyof ClientEvents;

        console.log(`[Event] '${event}' 등록됨`);

        if (eventHandler.once) {
            client.once(event, (...args) => eventHandler.execute(...args));
        } else {
            client.on(event, (...args) => eventHandler.execute(...args));
        }
    }
}