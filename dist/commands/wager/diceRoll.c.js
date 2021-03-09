"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const command = {
    name: 'diceRoll',
    aliases: ['dr'],
    isActive: true,
    execute(msg, args) {
        __1.clean(msg, 'Please enter a value ');
        const filter = (m) => m.author.id === msg.author.id;
        msg.channel.awaitMessages(filter, {
            max: 1,
            time: 30000,
            errors: ['time']
        }).catch(collected => {
        });
        msg.delete();
    }
};
module.exports = command;
//# sourceMappingURL=diceRoll.c.js.map