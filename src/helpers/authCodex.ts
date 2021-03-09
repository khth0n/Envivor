import { Message } from 'discord.js';
import { clean } from './chatCleaner';

export enum AuthCodex {
    ERROR,
    NOT_IN_VOICE,
    PERMISSIONS,
    PRIVILEGES,
    OK
}

export function isOK(value: number){
    return value === AuthCodex.OK;
}

export function sendAuthError(msg: Message, text: string, authError: number){
    clean(msg, `${text} Issue ${AuthCodex[authError]}`);
}