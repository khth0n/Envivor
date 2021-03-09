import { Message } from "discord.js";

export interface Command {
    name: string;
    aliases: string[];
    isActive: true;
    execute(msg: Message, args: string[]): void;
}