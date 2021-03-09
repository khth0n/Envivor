import { Message } from 'discord.js';

async function clean(msg: Message, text?: string){
    if(!text) return await msg.delete({timeout: 4000});
    
    const message = await msg.channel.send(text);

    message.delete({timeout: 4000}).catch(err => { console.log(err); });
    msg.delete({timeout: 4000}).catch(err => { console.log(err); });
}

export default clean;