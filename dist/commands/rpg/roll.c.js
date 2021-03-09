"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { DiceGame } from '../../helpers/DiceGame';
const __1 = require("..");
const rollGame = new __1.DiceGame([6, 20, 100]);
const command = {
    name: 'roll',
    aliases: ['dice', 'r'],
    isActive: true,
    execute(msg, args) {
        let results = rollGame.rollDieSeries(args);
        let text = '\n>>> ';
        for (const result of results) {
            text += result.text;
        }
        msg.reply(text);
        msg.delete();
    }
};
module.exports = command;
//# sourceMappingURL=roll.c.js.map