"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomInt = void 0;
function getRandomInt(max, min) {
    let maxInteger = Math.floor(max);
    let minInteger = min || 0;
    return Math.floor(Math.random() * (1 + maxInteger - minInteger)) + minInteger;
}
exports.getRandomInt = getRandomInt;
//# sourceMappingURL=random.js.map