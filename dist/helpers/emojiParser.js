"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const emojis = require('../../local/emoji.json');
function parse(text) {
    let words = text.split(' ');
    for (let i = 0; i < words.length; i++) {
        let emojiValue = emojis[words[i]];
        if (emojiValue) {
            words[i] = emojiValue;
        }
    }
    return words.join(' ');
}
exports.parse = parse;
//# sourceMappingURL=emojiParser.js.map