const regex = /(?=[+-])|k[hlc]|d[hlc]|d/g;

export enum DieDataKeys {
    SIDES = 'd',
    KEEPHIGH = 'kh',
    KEEPLOW = 'kl',
    KEEPCHOICE = 'kc',
    DROPHIGH = 'dh',
    DROPLOW = 'dl',
    DROPCHOICE = 'dc',
    MODIFIER = 'mod',
    DIESTRING = 'str'
}

interface DieDataPair {
    [key: string]: number
}

export interface DieData {
    notation: string;
    rolls: number;
    data: DieDataPair;
}

export function parseDieString(dieString: string): DieData{

    dieString = dieString.toLowerCase();

    const valueArr = dieString.split(regex);

    const keyArr = dieString.match(regex);

    let dieData: DieData = {
        notation: dieString,
        rolls: 0,
        data: {}
    };

    if(!keyArr) return dieData;

    if(valueArr.length - keyArr.length !== 1) return dieData;

    let repeat = valueArr.shift();

    dieData.rolls = repeat !== '' ? parseInt(repeat!, 10) : 1;

    for(let i = 0; i < valueArr.length; i++){
        const value = parseInt(valueArr[i], 10);

        const key = keyArr[i] !== '' ? keyArr[i] : 'mod';

        dieData.data[key] = value;
    }

    return dieData;
}