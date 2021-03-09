import { Message } from 'discord.js';
import { parse } from './emojiParser';
import { triggerSystemRecord } from '../commands/general/TriggerSystem';

export function checkTrigger(msg: Message) {
    
    let text = msg.content;
    let serverID = msg.guild!.id;

    let triggerSystem = triggerSystemRecord[serverID];

    //console.log(triggerSystemRecord);
    if(triggerSystem){
        for(const trigger in triggerSystem.record){
            if(text === trigger){
                msg.channel.send(parse(triggerSystem.getResponse(trigger)));
            }
        }
    }
}