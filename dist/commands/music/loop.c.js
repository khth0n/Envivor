"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const MusicObserver_1 = require("./MusicObserver");
const command = {
    name: 'loop',
    aliases: ['l'],
    isActive: true,
    execute(msg, args) {
        const result = MusicObserver_1.observer.loopClient(msg.guild.id);
        __1.clean(msg, result);
    }
};
module.exports = command;
//# sourceMappingURL=loop.c.js.map