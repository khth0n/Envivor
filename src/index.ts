import Discord, { Client, Collection, MessageEmbed } from 'discord.js';
import fs from 'fs';

interface Command {
    execute(message: Discord.Message, args: string[]): any;
    isActive?: boolean;
}

interface EnvivorClient {
    discordClient: Client;
    commands: Collection<string, Command>;
};

const { discordClient: client, commands}: EnvivorClient = {
    discordClient: new Client(),
    commands: new Discord.Collection()
};

const commandFiles = fs.readdirSync('./dist/commands').filter(file => file.endsWith('.js'));


for(const file of commandFiles){
    const { aliases, execute, isActive } = require(`./commands/${file}`);
    const command: Command = {
        execute,
        isActive
    }

    for(const alias of aliases) commands.set(alias, command);
}

const { PREFIX = '', BOT_TOKEN = ''} = process.env;


client.login(BOT_TOKEN);

client.once('ready', () => {
    console.log('Envivor online!');
});

client.on('message', async message => {
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(' ');
    const command = args.shift()?.toLowerCase() || '';

    const request = commands.get(command);
    if(request) request.execute(message, args);
});