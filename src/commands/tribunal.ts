import { GuildMember, GuildMemberManager, Message, MessageEmbed } from 'discord.js';
import CommandHandler from '../BasicCommandHandler';
import idParser from '../idReference';
import cleaner from '../chatCleaner';

const { execute }: CommandHandler = {
    async execute(msg: Message, args: string[]){
        const member = await getMember(msg.guild?.members as GuildMemberManager, args[0]);

        //const announcement = await msg.channel.send(`@everyone, ${msg.member} has accused ${member} of ${args.slice(1).join(' ')}`);
        //await announcement.react('👍');
        //await announcement.react('👎');
        const petitioner = (msg.member as GuildMember).id === member.id ? 'Self' : msg.member?.displayName;

        const embed = new MessageEmbed({
            color: msg.member?.displayColor,
            title: `${petitioner} v. ${member.displayName}`,
            description: new Date().toLocaleDateString('en-US'),
            fields: [
                {
                    name: `Petitioner\n${petitioner}`,
                    value: `Alleging: ${args.slice(1).join(' ')}`,
                    inline: true
                },
                {
                    name: `Accused\n${member.displayName}`,
                    value: `Win/Loss: 50%`,
                    inline: true
                }
            ]
        });

        const announcement = await msg.channel.send(embed);
        await announcement.react('👍');
        await announcement.react('👎');

        msg.delete();
    }
};

async function getMember(manager: GuildMemberManager, reference: string): Promise<GuildMember> {
    return await manager.fetch(idParser(reference));
}

module.exports = {
    
};