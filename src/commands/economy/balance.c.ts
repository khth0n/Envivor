import { Message } from 'discord.js';
import CommandHandler from '../../BasicCommandHandler';
import { Ledger, ledgerRecord, saveLedger } from './Ledger';
import cleaner from '../../chatCleaner';

const { execute }: CommandHandler = {
    execute(msg: Message, args: string[]){
        
        let { guild, member } = msg;

        let serverID = guild!.id;
        let ledger = ledgerRecord[serverID];

        if(!ledger){
            ledger = new Ledger(serverID);
            ledgerRecord[serverID] = ledger;
        }

        let userID = member!.user.id; 
        
        let account = ledger.getAccount(userID);

        if(!account){
            account = ledger.createAccount(userID);
            cleaner(msg, `A new balance with $${account.balance} has been created.`);

            saveLedger(serverID);
            return;
        }

        msg.reply(`You have a balance of $${account.balance}!`);
    }
}

module.exports = {
    name: 'balance',
    aliases: ['bal'],
    isActive: true,
    execute
}
