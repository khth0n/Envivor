import { Message } from "discord.js";
import { Command, clean } from '..';

const command: Command = {
    name: 'craps',
    aliases: ['c'],
    isActive: true,
    execute(msg: Message, args: String[]){
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