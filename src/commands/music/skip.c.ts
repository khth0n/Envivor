import { Message } from 'discord.js';
import { Command, clean } from '..';
import { observer } from './MusicObserver';

const command: Command = {
    name: 'skip',
    aliases: ['s'],
    isActive: true,
    execute(msg: Message, args: string[]){
        
        const result = observer.skipClient(msg.guild!.id);

        clean(msg, result);
    }
}

module.exports = command;