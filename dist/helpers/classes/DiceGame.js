"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiceGame = void 0;
const __1 = require("..");
//import { getRandomInt } from '..';
class Die {
    constructor(sides) {
        this.sides = sides;
    }
    roll() {
        return __1.getRandomInt(this.sides, 1);
    }
}
class DiceGame {
    constructor(dieValues) {
        this.map = {};
        for (const dieValue of dieValues) {
            this.addDie(dieValue);
        }
    }
    addDie(dieValue) {
        this.map[`d${dieValue}`] = new Die(dieValue);
    }
    upsertDie(dieData) {
        const sides = dieData.data[__1.DieDataKeys.SIDES];
        let die = this.map[`d${sides}`];
        if (!die) {
            die = new Die(sides);
        }
        return die;
    }
    getRollResults(dieData) {
        let die = this.upsertDie(dieData);
        let results = [];
        for (let i = 0; i < dieData.rolls; i++) {
            results.push(die.roll());
        }
        return results;
    }
    applyRollConditions(arr, { data }) {
        const droppedHighs = data[__1.DieDataKeys.DROPHIGH];
        const keptHighs = data[__1.DieDataKeys.KEEPHIGH];
        if (droppedHighs || keptHighs) {
            arr.sort((a, b) => b - a);
            if (droppedHighs) {
                arr = arr.slice(droppedHighs);
            }
            if (keptHighs) {
                arr = arr.slice(0, keptHighs);
            }
        }
        const droppedLows = data[__1.DieDataKeys.DROPLOW];
        const keptLows = data[__1.DieDataKeys.KEEPLOW];
        if (droppedLows || keptLows) {
            arr.sort((a, b) => a - b);
            if (droppedLows) {
                arr = arr.slice(droppedLows);
            }
            if (keptLows) {
                arr = arr.slice(0, keptLows);
            }
        }
        const droppedChoices = data[__1.DieDataKeys.DROPCHOICE];
        const keptChoices = data[__1.DieDataKeys.KEEPCHOICE];
        if (droppedChoices || keptChoices) {
            if (droppedChoices) {
                arr = arr.slice(droppedChoices);
            }
            if (keptChoices) {
                arr = arr.slice(0, keptChoices);
            }
        }
        let value = arr.reduce((prev, curr) => prev + curr);
        if (data[__1.DieDataKeys.MODIFIER])
            value += data[__1.DieDataKeys.MODIFIER];
        return value;
    }
    rollDieSeries(dieStrings) {
        let dieDataArr = [];
        for (const dieString of dieStrings) {
            dieDataArr.push(__1.parseDieString(dieString));
        }
        let dieResults = [];
        for (const dieData of dieDataArr) {
            if (dieData.rolls < 1)
                continue;
            const result = this.getRollResults(dieData);
            let dieResult = {
                text: '```ini\n' + `[${dieData.notation}] | `,
                value: 0
            };
            dieResult.text += `${result.join(' + ')} = `;
            const sum = this.applyRollConditions(result, dieData);
            dieResult.text += `${sum}` + '```';
            dieResult.value = sum;
            dieResults.push(dieResult);
        }
        return dieResults;
    }
}
exports.DiceGame = DiceGame;
//# sourceMappingURL=DiceGame.js.map