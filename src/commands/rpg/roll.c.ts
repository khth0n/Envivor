import { Message } from 'discord.js';
import { Command } from '..';
//import { DiceGame } from '../../helpers/DiceGame';
import { DiceGame } from '..';

const rollGame = new DiceGame([6, 20, 100]);

const command: Command = {
    name: 'roll',
    aliases: ['dice', 'r'],
    isActive: true,
    execute(msg: Message, args: string[]){

        let results = rollGame.rollDieSeries(args);

        let text = '\n>>> ';
        for(const result of results){
            text += result.text;
        }

        msg.reply(text);

        msg.delete();
    }
}

module.exports = command;