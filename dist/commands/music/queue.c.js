"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const MusicObserver_1 = require("./MusicObserver");
const command = {
    name: 'queue',
    aliases: ['q'],
    isActive: true,
    execute(msg, args) {
        const embed = MusicObserver_1.observer.getClientQueue(msg.guild.id);
        if (typeof embed === 'string')
            return __1.clean(msg, embed);
        msg.channel.send(embed);
        msg.delete();
    }
};
module.exports = command;
//# sourceMappingURL=queue.c.js.map