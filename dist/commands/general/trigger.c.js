"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chatCleaner_1 = require("../../helpers/chatCleaner");
const TriggerSystem_1 = require("./TriggerSystem");
const command = {
    name: 'trigger',
    aliases: ['trig'],
    isActive: true,
    execute(msg, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let serverID = msg.guild.id;
            let triggerSystem = TriggerSystem_1.triggerSystemRecord[serverID];
            let operation = args.shift();
            let [trigger, response] = args.join(' ').split(' | ');
            switch (operation) {
                case 'add':
                    if (!trigger || !response) {
                        return chatCleaner_1.clean(msg, 'Please provide a trigger AND response!\nEx. =trigger add hi bye');
                    }
                    if (!triggerSystem) {
                        triggerSystem = new TriggerSystem_1.TriggerSystem(serverID);
                        TriggerSystem_1.triggerSystemRecord[serverID] = triggerSystem;
                    }
                    triggerSystem.addResponse(trigger, response);
                    return chatCleaner_1.clean(msg, `Successfully added ${response} to ${trigger}'s trigger list!`);
                case 'remove':
                    if (!triggerSystem) {
                        return chatCleaner_1.clean(msg, 'This server has not yet created a trigger system! You can make one with =trigger add!');
                    }
                    if (!trigger) {
                        return chatCleaner_1.clean(msg, 'Please specify the trigger to be removed!');
                    }
                    if (response && triggerSystem.deleteResponse(trigger, response)) {
                        return chatCleaner_1.clean(msg, `Successfully removed ${response} from ${trigger}'s trigger list!`);
                    }
                    else if (!response && triggerSystem.deleteTrigger(trigger)) {
                        return chatCleaner_1.clean(msg, `Successfully removed ${trigger} from trigger system!`);
                    }
                    else {
                        return chatCleaner_1.clean(msg, 'Trigger system does not contain the provided trigger or response!');
                    }
                default:
                    return chatCleaner_1.clean(msg, 'Please specify a valid operation!\n Ex. =trigger add');
            }
        });
    }
};
module.exports = command;
//# sourceMappingURL=trigger.c.js.map