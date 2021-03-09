import { retrieve, save } from '..';

class Account {
    balance: number;

    constructor(amount?: number){
        if(amount){
            this.balance = amount;
        } else {
            this.balance = 500;
        }
    }

    credit(amount: number){
        this.balance += amount;
    }

    debit(amount: number){
        this.balance -= amount;
    }

    canAfford(expense: number): boolean {
        return this.balance >= expense;
    }
}

interface AccountRecord {
    [key: string]: Account;
}

class Ledger {

    record: AccountRecord = {};

    constructor(readonly serverID: string, accountRecord?: AccountRecord){

        if(accountRecord){
            this.record = accountRecord;
        }
    }

    createAccount(userID: string): Account{
        let newAccount = new Account();

        this.addAccount(userID, newAccount);

        return newAccount;
    }

    addAccount(userID: string, account: Account){
        this.record[userID] = account;
    }

    setAccount(userID: string, amount: number){
        let account = this.getAccount(userID);

        account.balance = amount;
    }

    clearAccount(userID: string){
        this.setAccount(userID, 0);
    }

    getAccount(userID: string){
        return this.record[userID];
    }
}

interface LedgerRecord {
    [key: string]: Ledger
}

var ledgerRecord: LedgerRecord = {};

async function getLedgers(){
    let ledgers = await retrieve('./local/ledgers', []);

    for(const ledger of ledgers){
        let { serverID, record }: Ledger = ledger;

        let newAccountRecord: AccountRecord = {};

        for(const userID in record){
            newAccountRecord[userID] = new Account(record[userID].balance);
        }
        
        ledgerRecord[serverID] = new Ledger(serverID, newAccountRecord);
    }
}

getLedgers();

async function saveLedger(serverID: string){
    save(ledgerRecord[serverID], `./local/ledgers/${serverID}.json`);
}

export {
    Ledger,
    ledgerRecord,
    saveLedger
}