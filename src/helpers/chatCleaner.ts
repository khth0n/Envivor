import { Message } from 'discord.js';

function messageDelete(msg: Message, delay?: number){
    msg.delete({ timeout: delay || 4000 }).catch(err => { console.log(err); });
}

export async function clean(msg: Message, text?: string, delay?: number){

    let time = delay || 4000;

    messageDelete(msg, time);

    if(!text) return;

    const message = await msg.channel.send(text);

    messageDelete(message, time);
}