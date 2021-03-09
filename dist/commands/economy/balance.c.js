"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ledger_1 = require("./Ledger");
const chatCleaner_1 = __importDefault(require("../../chatCleaner"));
const { execute } = {
    execute(msg, args) {
        let { guild, member } = msg;
        let serverID = guild.id;
        let ledger = Ledger_1.ledgerRecord[serverID];
        if (!ledger) {
            ledger = new Ledger_1.Ledger(serverID);
            Ledger_1.ledgerRecord[serverID] = ledger;
        }
        let userID = member.user.id;
        let account = ledger.getAccount(userID);
        if (!account) {
            account = ledger.createAccount(userID);
            chatCleaner_1.default(msg, `A new balance with $${account.balance} has been created.`);
            Ledger_1.saveLedger(serverID);
            return;
        }
        msg.reply(`You have a balance of $${account.balance}!`);
    }
};
module.exports = {
    name: 'balance',
    aliases: ['bal'],
    isActive: true,
    execute
};
//# sourceMappingURL=balance.c.js.map