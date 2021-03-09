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
const __1 = require("..");
function clear(channel, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        let messages = yield channel.messages.fetch({ limit: amount ? Math.min(1 + amount, 100) : 100 });
        messages = yield channel.bulkDelete(messages);
        if (!amount && messages.size === 100) {
            clear(channel);
        }
    });
}
function clearUser(channel, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        let messages = yield channel.messages.fetch();
        messages = messages.filter((message) => {
            return message.author.id === userID;
        });
        messages = yield channel.bulkDelete(messages);
        if (messages.size > 0) {
            clearUser(channel, userID);
        }
    });
}
const command = {
    name: 'clear',
    aliases: ['c'],
    isActive: true,
    execute(msg, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let channel = msg.channel;
            let [operation] = args;
            if (operation === 'all') {
                return clear(channel);
            }
            if (operation === 'me') {
                return clearUser(channel, msg.author.id);
            }
            let amount = parseInt(operation, 10);
            if (amount > 0) {
                return clear(channel, amount);
            }
            __1.clean(msg, 'Please give me the amount of messages to delete! Ex. =clear 5');
        });
    }
};
module.exports = command;
//# sourceMappingURL=clear.c.js.map