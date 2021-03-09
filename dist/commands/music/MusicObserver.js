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
exports.observer = void 0;
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const MusicClient_1 = require("./MusicClient");
class MusicObserver {
    constructor() {
        this.clientMap = new Map();
    }
    createClient({ member, guild, channel }, voice, url) {
        return __awaiter(this, void 0, void 0, function* () {
            const serverID = guild.id;
            const voiceConnection = yield voice.join();
            const client = new MusicClient_1.MusicClient(serverID, channel, voice, voiceConnection);
            this.clientMap.set(serverID, client);
            return client;
        });
    }
    getClient(serverID) {
        return this.clientMap.get(serverID) || 'There is no active queue!';
    }
    getSong(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield ytdl_core_1.default.getInfo(url)).videoDetails;
        });
    }
    addToClient(msg, url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const voice = (_a = msg.member) === null || _a === void 0 ? void 0 : _a.voice.channel;
            if (!voice)
                return `Please join a voice channel to play/add music!`;
            let song = yield this.getSong(url);
            song.requester = msg.author.id;
            const serverID = msg.guild.id;
            let client = this.getClient(serverID);
            if (typeof client === 'string') {
                client = yield this.createClient(msg, voice, url);
            }
            client.add(song);
            return `Successfully added **${song.title}** to queue!`;
        });
    }
    getClientQueue(serverID) {
        const client = this.getClient(serverID);
        if (typeof client === 'string')
            return client;
        return client.getQueue();
    }
    pauseClient(serverID) {
        const client = this.getClient(serverID);
        if (typeof client === 'string')
            return client;
        client.togglePause();
        return client.pauseStatus();
    }
    loopClient(serverID) {
        const client = this.getClient(serverID);
        if (typeof client === 'string')
            return client;
        client.toggleLoop();
        return client.loopStatus();
    }
    skipClient(serverID) {
        const client = this.getClient(serverID);
        if (typeof client === 'string')
            return client;
        client.skip();
        return ':fast_forward: Skipped!';
    }
    changeClientVolume(serverID, newVolume) {
        const client = this.getClient(serverID);
        if (typeof client === 'string')
            return client;
        client.setVolume(newVolume);
        return `:loud_sound: **Volume is now set to ${newVolume}%**`;
    }
    closeClient(serverID) {
        const client = this.getClient(serverID);
        if (typeof client === 'string')
            return client;
        client.stop();
        this.clientMap.delete(serverID);
        return ':wave: Until the next jam session, friends!';
    }
}
exports.observer = new MusicObserver();
//# sourceMappingURL=MusicObserver.js.map