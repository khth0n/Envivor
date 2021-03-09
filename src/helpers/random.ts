export function getRandomInt(max: number, min?: number){
    let maxInteger = Math.floor(max);
    let minInteger = min || 0;

    return Math.floor(Math.random() * (1 + maxInteger - minInteger)) + minInteger;
}