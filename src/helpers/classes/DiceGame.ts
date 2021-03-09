import { DieDataKeys, DieData, parseDieString, getRandomInt } from '..';
//import { getRandomInt } from '..';

class Die {
    constructor(readonly sides: number){

    }

    roll(): number{
        return getRandomInt(this.sides, 1);
    }
}

interface DiceMap {
    [key: string]: Die
}

interface DieResult {
    text: string,
    value: number
}

export class DiceGame {
    private map: DiceMap = {};

    constructor(dieValues: number[]){

        for(const dieValue of dieValues){
            this.addDie(dieValue);
        }
    }

    private addDie(dieValue: number){
        this.map[`d${dieValue}`] = new Die(dieValue);
    }

    private upsertDie(dieData: DieData){

        const sides = dieData.data[DieDataKeys.SIDES];
        let die = this.map[`d${sides}`];

        if(!die){
            die = new Die(sides);
        }

        return die;
    }

    private getRollResults(dieData: DieData): number[] {

        let die = this.upsertDie(dieData);

        let results: number[] = [];

        for(let i = 0; i < dieData.rolls; i++){
            results.push(die.roll());
        }

        return results;
    }

    private applyRollConditions(arr: number[], { data }: DieData): number {

        const droppedHighs = data[DieDataKeys.DROPHIGH];
        const keptHighs = data[DieDataKeys.KEEPHIGH];
        if(droppedHighs || keptHighs){
            arr.sort((a: number, b: number) => b - a);
            if(droppedHighs){
                arr = arr.slice(droppedHighs);
            }

            if(keptHighs){
                arr = arr.slice(0, keptHighs);
            }
        }

        const droppedLows = data[DieDataKeys.DROPLOW];
        const keptLows = data[DieDataKeys.KEEPLOW];
        if(droppedLows || keptLows){
            arr.sort((a: number, b: number) => a - b);
            if(droppedLows){
                arr = arr.slice(droppedLows);
            }

            if(keptLows){
                arr = arr.slice(0, keptLows);
            }
        }

        const droppedChoices = data[DieDataKeys.DROPCHOICE];
        const keptChoices = data[DieDataKeys.KEEPCHOICE];
        if(droppedChoices || keptChoices){
            if(droppedChoices){
                arr = arr.slice(droppedChoices);
            }

            if(keptChoices){
                arr = arr.slice(0, keptChoices);
            }
        }

        let value = arr.reduce((prev: number, curr: number) => prev + curr);

        if(data[DieDataKeys.MODIFIER]) value += data[DieDataKeys.MODIFIER];

        return value;
    }

    rollDieSeries(dieStrings: string[]): DieResult[]{
        let dieDataArr: DieData[] = [];

        for(const dieString of dieStrings){
            dieDataArr.push(parseDieString(dieString));
        }

        let dieResults: DieResult[] = [];

        for(const dieData of dieDataArr){
            if(dieData.rolls < 1) continue;

            const result = this.getRollResults(dieData);

            let dieResult: DieResult = {
                text: '```ini\n' + `[${dieData.notation}] | `,
                value: 0
            }

            dieResult.text += `${result.join(' + ')} = `;

            const sum = this.applyRollConditions(result, dieData);

            dieResult.text += `${sum}` + '```';
            dieResult.value = sum;

            dieResults.push(dieResult);
        }

        return dieResults;
    }
}