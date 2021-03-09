"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const command = {
    name: 'presence',
    aliases: ['ps'],
    isActive: true,
    execute(msg, args) {
        const activityData = args.join(' ').split(' | ');
        console.log(activityData);
        __1.setPresence(msg.client, activityData);
    }
};
module.exports = command;
//# sourceMappingURL=presence.c.js.map