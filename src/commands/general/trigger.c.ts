import { Message } from 'discord.js';
import { Command } from '../';
import { clean } from '../../helpers/chatCleaner';
import { TriggerSystem, triggerSystemRecord, saveTriggerSystem } from './TriggerSystem';

const command: Command = {
    name: 'trigger',
    aliases: ['trig'],
    isActive: true,
    async execute(msg: Message, args: string[]){


        let serverID = msg.guild!.id;

        let triggerSystem = triggerSystemRecord[serverID];

        let operation = args.shift();

        let [ trigger, response ] = args.join(' ').split(' | ');

        switch(operation){
            case 'add':
                if(!trigger || !response){
                    return clean(msg, 'Please provide a trigger AND response!\nEx. =trigger add hi bye');
                }

                if(!triggerSystem){
                    triggerSystem = new TriggerSystem(serverID);
                    triggerSystemRecord[serverID] = triggerSystem;
                }

                triggerSystem.addResponse(trigger, response);

                return clean(msg, `Successfully added ${response} to ${trigger}'s trigger list!`);
            case 'remove':
                if(!triggerSystem){
                    return clean(msg, 'This server has not yet created a trigger system! You can make one with =trigger add!');
                }

                if(!trigger){
                    return clean(msg, 'Please specify the trigger to be removed!');
                }

                if(response && triggerSystem.deleteResponse(trigger, response)){
                    return clean(msg, `Successfully removed ${response} from ${trigger}'s trigger list!`);
                } else if(!response && triggerSystem.deleteTrigger(trigger)){
                    return clean(msg, `Successfully removed ${trigger} from trigger system!`);
                } else {
                    return clean(msg, 'Trigger system does not contain the provided trigger or response!');
                }
            default:
                return clean(msg, 'Please specify a valid operation!\n Ex. =trigger add');
        }
    }
}

module.exports = command;