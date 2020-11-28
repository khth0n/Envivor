import { Message } from 'discord.js';

async function clean(msg: Message, text?: string){
    if(!text) return await msg.delete({timeout: 4000});
    
    const message = await msg.reply(text);

    message.delete({timeout: 4000});
    msg.delete({timeout: 4000});
}

export default clean;