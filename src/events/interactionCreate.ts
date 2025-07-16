import { Events, Client } from 'discord.js';
import {EventHandler} from "../event_handler";

export const ReadyEvent: EventHandler = {
	name: Events.ClientReady,
	once: true,
	execute: (client: Client)=> {
	    console.log(`${client.user!!.tag} 준비 완료!`);
	}
}