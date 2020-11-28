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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chatCleaner_1 = __importDefault(require("../chatCleaner"));
const ytdl_core_1 = __importDefault(require("ytdl-core"));
class MusicPlayer {
    constructor() {
        this.queueMap = new Map();
    }
    getServerQueue(serverID) {
        return this.queueMap.get(serverID);
    }
    add(msg, url) {
        return __awaiter(this, void 0, void 0, function* () {
            const { member, guild } = msg;
            const voice = member === null || member === void 0 ? void 0 : member.voice.channel;
            if (!voice)
                return chatCleaner_1.default(msg, 'Please join a voice channel to play music!');
            const serverID = guild === null || guild === void 0 ? void 0 : guild.id;
            if (!serverID)
                return chatCleaner_1.default(msg, 'Error! Invalid guild id!');
            const serverQueue = this.getServerQueue(serverID);
            const { title, video_url } = (yield ytdl_core_1.default.getInfo(url)).videoDetails;
            const song = { title, video_url };
            if (!serverQueue) {
                const contract = {
                    textChannel: msg.channel,
                    voiceChannel: voice,
                    connection: null,
                    songs: [],
                    volume: 5,
                    playing: true
                };
                this.queueMap.set(serverID, contract);
                contract.songs.push(song);
                try {
                    contract['connection'] = yield voice.join();
                    this.play(serverID, contract.songs[0]);
                }
                catch (err) {
                    console.log(err);
                    this.queueMap.delete(serverID);
                    return chatCleaner_1.default(msg, 'Error! Failed to join voice!');
                }
            }
            else {
                serverQueue.songs.push(song);
                console.log(serverQueue);
            }
        });
    }
    play(serverID, song) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const serverQueue = this.getServerQueue(serverID);
            const dispatcher = (_a = serverQueue === null || serverQueue === void 0 ? void 0 : serverQueue.connection) === null || _a === void 0 ? void 0 : _a.play(ytdl_core_1.default(song.video_url));
            dispatcher === null || dispatcher === void 0 ? void 0 : dispatcher.on('finish', () => {
                serverQueue === null || serverQueue === void 0 ? void 0 : serverQueue.songs.shift();
                const newSong = serverQueue === null || serverQueue === void 0 ? void 0 : serverQueue.songs[0];
                if (!newSong) {
                    serverQueue === null || serverQueue === void 0 ? void 0 : serverQueue.voiceChannel.leave();
                    this.queueMap.delete(serverID);
                    return;
                }
                this.play(serverID, newSong);
            });
            dispatcher === null || dispatcher === void 0 ? void 0 : dispatcher.on('error', error => console.error());
            dispatcher === null || dispatcher === void 0 ? void 0 : dispatcher.setVolumeLogarithmic(1);
            serverQueue === null || serverQueue === void 0 ? void 0 : serverQueue.textChannel.send(`Now playing: **${song.title}**`);
        });
    }
    skip(msg) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { member, guild } = msg;
            if (!(member === null || member === void 0 ? void 0 : member.voice.channel))
                return chatCleaner_1.default(msg, 'Please join voice to stop the music!');
            if (!guild)
                return;
            const serverQueue = this.getServerQueue(guild.id);
            if (!serverQueue)
                return chatCleaner_1.default(msg, 'There are no songs currently playing!');
            (_a = serverQueue.connection) === null || _a === void 0 ? void 0 : _a.dispatcher.end();
        });
    }
    stop(msg) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { member, guild } = msg;
            if (!(member === null || member === void 0 ? void 0 : member.voice.channel))
                return chatCleaner_1.default(msg, 'Please join voice to stop the music!');
            if (!guild)
                return;
            const serverQueue = this.getServerQueue(guild.id);
            if (!serverQueue)
                return;
            serverQueue.songs = [];
            (_a = serverQueue.connection) === null || _a === void 0 ? void 0 : _a.dispatcher.end();
        });
    }
}
const jukebox = new MusicPlayer();
const { exe: execute } = {
    exe(msg, args) {
        const item = args[0];
        switch (item) {
            case 'skip':
                jukebox.skip(msg);
                break;
            case 'stop':
                jukebox.stop(msg);
                break;
            default:
                jukebox.add(msg, item);
                break;
        }
    }
};
exports.default = execute;
