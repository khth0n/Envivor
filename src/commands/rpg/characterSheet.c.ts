import { Message } from 'discord.js';
import { Command } from '..';

const command: Command = {
    name: 'sheet',
    aliases: ['id', 'profile', 'cs'],
    isActive: true,
    execute(msg: Message, args: string[]){
        
    }
}

module.exports = command;