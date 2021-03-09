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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const idReference_1 = __importDefault(require("../idReference"));
const { execute } = {
    execute(msg, args) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const member = yield getMember((_a = msg.guild) === null || _a === void 0 ? void 0 : _a.members, args[0]);
            //const announcement = await msg.channel.send(`@everyone, ${msg.member} has accused ${member} of ${args.slice(1).join(' ')}`);
            //await announcement.react('👍');
            //await announcement.react('👎');
            const petitioner = msg.member.id === member.id ? 'Self' : (_b = msg.member) === null || _b === void 0 ? void 0 : _b.displayName;
            const embed = new discord_js_1.MessageEmbed({
                color: (_c = msg.member) === null || _c === void 0 ? void 0 : _c.displayColor,
                title: `${petitioner} v. ${member.displayName}`,
                description: new Date().toLocaleDateString('en-US'),
                fields: [
                    {
                        name: `Petitioner\n${petitioner}`,
                        value: `Alleging: ${args.slice(1).join(' ')}`,
                        inline: true
                    },
                    {
                        name: `Accused\n${member.displayName}`,
                        value: `Win/Loss: 50%`,
                        inline: true
                    }
                ]
            });
            const announcement = yield msg.channel.send(embed);
            yield announcement.react('👍');
            yield announcement.react('👎');
            msg.delete();
        });
    }
};
function getMember(manager, reference) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield manager.fetch(idReference_1.default(reference));
    });
}
module.exports = {};
//# sourceMappingURL=tribunal.js.map