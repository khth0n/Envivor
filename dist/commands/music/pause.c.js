"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const MusicObserver_1 = require("./MusicObserver");
const command = {
    name: 'pause',
    aliases: ['toggle', 'pp', 'tp'],
    isActive: true,
    execute(msg, args) {
        const result = MusicObserver_1.observer.pauseClient(msg.guild.id);
        __1.clean(msg, result);
    }
};
module.exports = command;
//# sourceMappingURL=pause.c.js.map