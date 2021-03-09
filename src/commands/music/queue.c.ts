import { Message } from 'discord.js';
import { Command, clean } from '..';
import { observer } from './MusicObserver';

const command: Command = {
    name: 'queue',
    aliases: ['q'],
    isActive: true,
    execute(msg: Message, args: string[]){

        const embed = observer.getClientQueue(msg.guild!.id);
        
        if(typeof embed === 'string') return clean(msg, embed);

        msg.channel.send(embed);

        msg.delete();
    }
}

module.exports = command;