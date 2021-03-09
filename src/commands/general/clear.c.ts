import { Channel, Message, TextChannel } from 'discord.js';
import { Command, clean } from '..';

async function clear(channel: TextChannel, amount?: number){
    
    let messages = await channel.messages.fetch({ limit: amount ? Math.min(1 + amount, 100) : 100 });

    messages = await channel.bulkDelete(messages);

    if(!amount && messages.size === 100){
        clear(channel);
    }
}

async function clearUser(channel: TextChannel, userID: string){

    let messages = await channel.messages.fetch();

    messages = messages.filter((message) => {
        return message.author.id === userID;
    });

    messages = await channel.bulkDelete(messages);

    if(messages.size > 0){
        clearUser(channel, userID);
    }
}

const command: Command = {
    name: 'clear',
    aliases: ['c'],
    isActive: true,
    async execute(msg: Message, args: string[]){
        
        let channel = msg.channel as TextChannel;

        let [ operation ] = args;

        if(operation === 'all'){
            return clear(channel);
        }

        if(operation === 'me'){
            return clearUser(channel, msg.author.id);
        }

        let amount = parseInt(operation, 10);

        if(amount > 0){
            return clear(channel, amount);
        }

        clean(msg, 'Please give me the amount of messages to delete! Ex. =clear 5');
    }
}

module.exports = command;