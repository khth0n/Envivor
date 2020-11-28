"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MusicPlayer_1 = __importDefault(require("../music/MusicPlayer"));
const { exe: execute } = {
    exe(msg, args) {
        MusicPlayer_1.default(msg, args);
    }
};
module.exports = {
    aliases: ['music', 'm'],
    execute,
    isActive: true
};
