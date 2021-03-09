import Discord, { Client, Collection, MessageEmbed } from 'discord.js';

import { Command, checkTrigger, retrieve, setPresence } from './helpers';

const commandInfo = require('../local/commandInfo');

interface EnvivorClient {
    discordClient: Client;
    commands: Collection<string, Command>;
};

const { discordClient: client, commands}: EnvivorClient = {
    discordClient: new Client(),
    commands: new Discord.Collection()
};

async function assembleCommands(){
    let commandList = await retrieve('./dist/commands', [], '.c.js', true);

    for(const command of commandList){

        const cmd: Command = command;
        const name = cmd.name;

        console.log(name);
        commands.set(name, cmd);
    }
}

assembleCommands();

const { PREFIX = '', BOT_TOKEN = ''} = process.env;


client.login(BOT_TOKEN);

client.once('ready', () => {
    console.log('Envivor online!');

    setPresence(client, [
        `${PREFIX}`,
        'LISTENING'
    ]);
});

client.on('message', async message => {

    if(!message.content.startsWith(PREFIX)){
        return message.author.bot || checkTrigger(message);
    }

    const args = message.content.slice(PREFIX.length).split(' ');
    const command = args.shift()?.toLowerCase() || '';

    const request = commands.get(command) || commands.get(commandInfo[command]);

    if(request && request.isActive) request.execute(message, args);
});

export * from './helpers';