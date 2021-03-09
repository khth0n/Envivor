"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const MusicObserver_1 = require("./MusicObserver");
const command = {
    name: 'volume',
    aliases: ['v', 'vol'],
    isActive: true,
    execute(msg, [potentialVolume]) {
        const newVolume = parseInt(potentialVolume);
        if (newVolume !== NaN && (newVolume <= 200 && newVolume > 0)) {
            const result = MusicObserver_1.observer.changeClientVolume(msg.guild.id, newVolume);
            return __1.clean(msg, result);
        }
        __1.clean(msg, 'Please provide me with a number between 1 and 200!');
    }
};
module.exports = command;
//# sourceMappingURL=volume.c.js.map