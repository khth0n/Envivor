"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command = {
    name: 'craps',
    aliases: ['c'],
    isActive: true,
    execute(msg, args) {
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
//# sourceMappingURL=craps.c.js.map