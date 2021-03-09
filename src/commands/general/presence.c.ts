import { Message } from 'discord.js';
import { Command, setPresence } from '..';

const command: Command = {
    name: 'presence',
    aliases: ['ps'],
    isActive: true,
    execute(msg: Message, args: string[]){
        const activityData = args.join(' ').split(' | ');
        
        console.log(activityData);

        setPresence(msg.client, activityData);
    }
}

module.exports = command;