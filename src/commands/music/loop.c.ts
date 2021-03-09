import { Message } from 'discord.js';
import { Command, clean } from '..';
import { observer } from './MusicObserver';

const command: Command = {
    name: 'loop',
    aliases: ['l'],
    isActive: true,
    execute(msg: Message, args: string[]){
        
        const result = observer.loopClient(msg.guild!.id);

        clean(msg, result);
    }
}

module.exports = command;