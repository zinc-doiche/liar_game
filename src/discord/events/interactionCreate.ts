import { Events, Client } from 'discord.js';
import {EventHandler} from "../event_handler";


class ReadyEventHandler implements EventHandler {
	name = Events.ClientReady;
	once = true;

	execute(client: Client) {
		console.log(`${client.user!!.tag} 준비 완료!`);
	};
}


const { name, once, execute } = new ReadyEventHandler();

export { name, once, execute }