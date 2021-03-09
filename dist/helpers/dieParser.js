"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDieString = exports.DieDataKeys = void 0;
const regex = /(?=[+-])|k[hlc]|d[hlc]|d/g;
var DieDataKeys;
(function (DieDataKeys) {
    DieDataKeys["SIDES"] = "d";
    DieDataKeys["KEEPHIGH"] = "kh";
    DieDataKeys["KEEPLOW"] = "kl";
    DieDataKeys["KEEPCHOICE"] = "kc";
    DieDataKeys["DROPHIGH"] = "dh";
    DieDataKeys["DROPLOW"] = "dl";
    DieDataKeys["DROPCHOICE"] = "dc";
    DieDataKeys["MODIFIER"] = "mod";
    DieDataKeys["DIESTRING"] = "str";
})(DieDataKeys = exports.DieDataKeys || (exports.DieDataKeys = {}));
function parseDieString(dieString) {
    dieString = dieString.toLowerCase();
    const valueArr = dieString.split(regex);
    const keyArr = dieString.match(regex);
    let dieData = {
        notation: dieString,
        rolls: 0,
        data: {}
    };
    if (!keyArr)
        return dieData;
    if (valueArr.length - keyArr.length !== 1)
        return dieData;
    let repeat = valueArr.shift();
    dieData.rolls = repeat !== '' ? parseInt(repeat, 10) : 1;
    for (let i = 0; i < valueArr.length; i++) {
        const value = parseInt(valueArr[i], 10);
        const key = keyArr[i] !== '' ? keyArr[i] : 'mod';
        dieData.data[key] = value;
    }
    return dieData;
}
exports.parseDieString = parseDieString;
//# sourceMappingURL=dieParser.js.map