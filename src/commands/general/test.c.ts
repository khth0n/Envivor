import { Message } from 'discord.js';
import { Command } from '..';

const command: Command = {
    name: 'test',
    aliases: ['t'],
    isActive: true,
    execute(msg: Message, args: String[]){

        let str = '';

        msg.guild?.emojis.cache.each(({name, id, animated}) => {
        
            let identifier = `:${name}:${id}>` 

            str += animated ? `<a${identifier}` : `<${identifier}`;

            str += '\n';
        });

        console.log(str);
    }
}

module.exports = command;