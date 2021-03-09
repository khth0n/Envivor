"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { execute } = {
    execute(msg, args) {
        console.log('ping');
    }
};
var test;
(function (test) {
    test["NO"] = "music";
    test["YES"] = "music";
})(test || (test = {}));
let test2 = test['NO'];
module.exports = {
    aliases: ['music', 'm'],
    execute,
    isActive: true
};
//# sourceMappingURL=music.js.map