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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importStar(require("discord.js"));
const helpers_1 = require("./helpers");
const commandInfo = require('../local/commandInfo');
;
const { discordClient: client, commands } = {
    discordClient: new discord_js_1.Client(),
    commands: new discord_js_1.default.Collection()
};
function assembleCommands() {
    return __awaiter(this, void 0, void 0, function* () {
        let commandList = yield helpers_1.retrieve('./dist/commands', [], '.c.js', true);
        for (const command of commandList) {
            const cmd = command;
            const name = cmd.name;
            console.log(name);
            commands.set(name, cmd);
        }
    });
}
assembleCommands();
const { PREFIX = '', BOT_TOKEN = '' } = process.env;
client.login(BOT_TOKEN);
client.once('ready', () => {
    console.log('Envivor online!');
    helpers_1.setPresence(client, [
        `${PREFIX}`,
        'LISTENING'
    ]);
});
client.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!message.content.startsWith(PREFIX)) {
        return message.author.bot || helpers_1.checkTrigger(message);
    }
    const args = message.content.slice(PREFIX.length).split(' ');
    const command = ((_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '';
    const request = commands.get(command) || commands.get(commandInfo[command]);
    if (request && request.isActive)
        request.execute(message, args);
}));
__exportStar(require("./helpers"), exports);
//# sourceMappingURL=index.js.map