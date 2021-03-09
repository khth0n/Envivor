"use strict";
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
exports.saveLedger = exports.ledgerRecord = exports.Ledger = void 0;
const __1 = require("..");
class Account {
    constructor(amount) {
        if (amount) {
            this.balance = amount;
        }
        else {
            this.balance = 500;
        }
    }
    credit(amount) {
        this.balance += amount;
    }
    debit(amount) {
        this.balance -= amount;
    }
    canAfford(expense) {
        return this.balance >= expense;
    }
}
class Ledger {
    constructor(serverID, accountRecord) {
        this.serverID = serverID;
        this.record = {};
        if (accountRecord) {
            this.record = accountRecord;
        }
    }
    createAccount(userID) {
        let newAccount = new Account();
        this.addAccount(userID, newAccount);
        return newAccount;
    }
    addAccount(userID, account) {
        this.record[userID] = account;
    }
    setAccount(userID, amount) {
        let account = this.getAccount(userID);
        account.balance = amount;
    }
    clearAccount(userID) {
        this.setAccount(userID, 0);
    }
    getAccount(userID) {
        return this.record[userID];
    }
}
exports.Ledger = Ledger;
var ledgerRecord = {};
exports.ledgerRecord = ledgerRecord;
function getLedgers() {
    return __awaiter(this, void 0, void 0, function* () {
        let ledgers = yield __1.retrieve('./local/ledgers', []);
        for (const ledger of ledgers) {
            let { serverID, record } = ledger;
            let newAccountRecord = {};
            for (const userID in record) {
                newAccountRecord[userID] = new Account(record[userID].balance);
            }
            ledgerRecord[serverID] = new Ledger(serverID, newAccountRecord);
        }
    });
}
getLedgers();
function saveLedger(serverID) {
    return __awaiter(this, void 0, void 0, function* () {
        __1.save(ledgerRecord[serverID], `./local/ledgers/${serverID}.json`);
    });
}
exports.saveLedger = saveLedger;
//# sourceMappingURL=Ledger.js.map