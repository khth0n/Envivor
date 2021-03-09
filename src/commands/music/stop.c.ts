import { Message } from 'discord.js';
import { Command, clean } from '..';
import { observer } from './MusicObserver';

const command: Command = {
    name: 'stop',
    aliases: ['disconnect', 'dc'],
    isActive: true,
    execute(msg: Message, args: string[]){
        
        const result = observer.closeClient(msg.guild!.id);

        clean(msg, result);
    }
}

module.exports = command;