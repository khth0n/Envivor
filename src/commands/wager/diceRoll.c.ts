import { Message } from "discord.js";
import { Command, clean } from '..';

const command: Command = {
    name: 'diceRoll',
    aliases: ['dr'],
    isActive: true,
    execute(msg: Message, args: String[]){
        
        clean(msg, 'Please enter a value ')

        const filter = (m: Message) => m.author.id === msg.author.id;

        msg.channel.awaitMessages(filter, {
            max: 1,
            time: 30000,
            errors: ['time']
        }).catch(collected => {
        });

        msg.delete();
    }
}

module.exports = command;