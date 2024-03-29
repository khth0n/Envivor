"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importStar(require("discord.js"));
const fs_1 = __importDefault(require("fs"));
;
const { discordClient: client, commands } = {
    discordClient: new discord_js_1.Client(),
    commands: new discord_js_1.default.Collection()
};
const commandFiles = fs_1.default.readdirSync('./dist/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const { aliases, execute, isActive } = require(`./commands/${file}`);
    const command = {
        execute,
        isActive
    };
    for (const alias of aliases)
        commands.set(alias, command);
}
const { PREFIX = '', BOT_TOKEN = '' } = process.env;
client.login(BOT_TOKEN);
client.once('ready', () => {
    console.log('Envivor online!');
});
client.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!message.content.startsWith(PREFIX) || message.author.bot)
        return;
    const args = message.content.slice(PREFIX.length).trim().split(' ');
    const command = ((_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '';
    const request = commands.get(command);
    if (request)
        request.execute(message, args);
}));
