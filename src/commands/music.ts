import { Message } from 'discord.js';
import CommandHandler from '../BasicCommandHandler';
import music from '../music/MusicPlayer';
import cleaner from '../chatCleaner';

const { exe: execute }: CommandHandler = {
    exe(msg: Message, args: string[]){
        music(msg, args);
    }
};


module.exports = {
    aliases: ['music', 'm'],
    execute,
    isActive: true
};