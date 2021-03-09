"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command = {
    name: 'test',
    aliases: ['t'],
    isActive: true,
    execute(msg, args) {
        var _a;
        let str = '';
        (_a = msg.guild) === null || _a === void 0 ? void 0 : _a.emojis.cache.each(({ name, id, animated }) => {
            let identifier = `:${name}:${id}>`;
            str += animated ? `<a${identifier}` : `<${identifier}`;
            str += '\n';
        });
        console.log(str);
    }
};
module.exports = command;
//# sourceMappingURL=test.c.js.map