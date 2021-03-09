import { Message } from 'discord.js';
import { Command, clean } from '..';
import { observer } from './MusicObserver';

const command: Command = {
    name: 'volume',
    aliases: ['v', 'vol'],
    isActive: true,
    execute(msg: Message, [ potentialVolume ]: string[]){
        
        const newVolume = parseInt(potentialVolume);

        if(newVolume !== NaN && (newVolume <= 200 && newVolume > 0)){
            const result = observer.changeClientVolume(msg.guild!.id, newVolume);

            return clean(msg, result);
        }

        clean(msg, 'Please provide me with a number between 1 and 200!');
    }
}

module.exports = command;