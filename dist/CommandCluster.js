"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const commandFiles = fs_1.default.readdirSync('./dist/commands').filter(file => file.endsWith('.js'));
let text = '';
let tally = 0;
for (const file of commandFiles) {
    const { aliases, execute, isActive } = require(`./commands/${file}`);
    for (const alias of aliases)
        text += `\t${alias} = ${tally},\n`;
    tally++;
}
let data = `enum test {\n${text}}`;
fs_1.default.writeFile('./src/test.ts', data, err => {
    if (err) {
        console.log('Error writing file', err);
    }
    else {
        console.log('Successfully wrote file');
    }
});
//# sourceMappingURL=CommandCluster.js.map