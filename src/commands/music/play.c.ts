import { Message } from 'discord.js';
import { Command, clean } from '..';
import { observer } from './MusicObserver';

const command: Command = {
    name: 'play',
    aliases: ['p'],
    isActive: true,
    async execute(msg: Message, [ url ]: string[]){

        const result = await observer.addToClient(msg, url);

        clean(msg, result);
    }
}

module.exports = command;