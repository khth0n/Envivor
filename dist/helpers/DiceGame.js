"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiceGame = void 0;
const dieParser_1 = require("./dieParser");
const __1 = require("..");
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
        const sides = dieData.data[dieParser_1.DieDataKeys.SIDES];
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
        const droppedHighs = data[dieParser_1.DieDataKeys.DROPHIGH];
        const keptHighs = data[dieParser_1.DieDataKeys.KEEPHIGH];
        if (droppedHighs || keptHighs) {
            arr.sort((a, b) => b - a);
            if (droppedHighs) {
                arr = arr.slice(droppedHighs);
            }
            if (keptHighs) {
                arr = arr.slice(0, keptHighs);
            }
        }
        const droppedLows = data[dieParser_1.DieDataKeys.DROPLOW];
        const keptLows = data[dieParser_1.DieDataKeys.KEEPLOW];
        if (droppedLows || keptLows) {
            arr.sort((a, b) => a - b);
            if (droppedLows) {
                arr = arr.slice(droppedLows);
            }
            if (keptLows) {
                arr = arr.slice(0, keptLows);
            }
        }
        const droppedChoices = data[dieParser_1.DieDataKeys.DROPCHOICE];
        const keptChoices = data[dieParser_1.DieDataKeys.KEEPCHOICE];
        if (droppedChoices || keptChoices) {
            if (droppedChoices) {
                arr = arr.slice(droppedChoices);
            }
            if (keptChoices) {
                arr = arr.slice(0, keptChoices);
            }
        }
        let value = arr.reduce((prev, curr) => prev + curr);
        if (data[dieParser_1.DieDataKeys.MODIFIER])
            value += data[dieParser_1.DieDataKeys.MODIFIER];
        return value;
    }
    rollDieSeries(dieStrings) {
        let dieDataArr = [];
        for (const dieString of dieStrings) {
            dieDataArr.push(dieParser_1.parseDieString(dieString));
        }
        let dieResults = [];
        for (const dieData of dieDataArr) {
            if (dieData.rolls < 1)
                continue;
            const result = this.getRollResults(dieData);
            let dieResult = {
                text: `${dieData.notation}: ${result.join(' + ')} = `,
                value: 0
            };
            const sum = this.applyRollConditions(result, dieData);
            dieResult.text += `${sum}\n`;
            dieResult.value = sum;
            dieResults.push(dieResult);
        }
        return dieResults;
    }
}
exports.DiceGame = DiceGame;
//# sourceMappingURL=DiceGame.js.map