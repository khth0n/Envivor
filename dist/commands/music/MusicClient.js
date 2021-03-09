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
exports.MusicClient = void 0;
const discord_js_1 = require("discord.js");
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const MusicObserver_1 = require("./MusicObserver");
var LoopState;
(function (LoopState) {
    LoopState[LoopState["NONE"] = 0] = "NONE";
    LoopState[LoopState["QUEUE"] = 1] = "QUEUE";
    LoopState[LoopState["SONG"] = 2] = "SONG";
})(LoopState || (LoopState = {}));
class MusicClient {
    constructor(serverID, textChannel, voiceChannel, connection) {
        this.serverID = serverID;
        this.textChannel = textChannel;
        this.voiceChannel = voiceChannel;
        this.connection = connection;
        this.queueIndex = 0;
        this.volume = 100;
        this.isPlaying = false;
        this.currentLoopState = 0;
        this.queue = [];
    }
    play({ video_url }) {
        return __awaiter(this, void 0, void 0, function* () {
            const dispatcher = this.connection.play(ytdl_core_1.default(video_url, { quality: 140 }));
            const queueMessage = yield this.textChannel.send(this.getQueue());
            dispatcher.on('finish', () => {
                if (this.currentLoopState < LoopState.SONG) {
                    this.queueIndex++;
                }
                queueMessage.delete();
                if (this.queueIndex >= this.queue.length) {
                    if (this.currentLoopState === LoopState.QUEUE) {
                        this.queueIndex = 0;
                    }
                    else {
                        MusicObserver_1.observer.closeClient(this.serverID);
                        return;
                    }
                }
                this.play(this.queue[this.queueIndex]);
            });
            dispatcher.on('error', error => console.error());
            dispatcher.on('volumeChange', () => {
                dispatcher.setVolumeLogarithmic(this.volume / 100);
            });
            dispatcher.setVolumeLogarithmic(this.volume / 100);
        });
    }
    getQueue() {
        const { title: currentTitle, video_url: currentURL, requester } = this.queue[this.queueIndex];
        let embed = new discord_js_1.MessageEmbed({
            author: {
                name: 'Envivor Music',
                iconURL: 'https://cdn.betterttv.net/emote/55898e122612142e6aaa935b/3x'
            },
            title: `:headphones::link: **${currentTitle}**`,
            url: `${currentURL}`,
            description: `:pushpin: <@!${requester}>`,
            footer: {
                text: 'Forward Unto Jam'
            }
        });
        let activeQueueText = `> **${this.queueIndex + 1}. ${currentTitle}**\n`;
        for (let i = this.queueIndex + 1; activeQueueText.length < 3000 && i < this.queue.length; i++) {
            const { title } = this.queue[i];
            activeQueueText += `**${i + 1}. ${title}**\n`;
        }
        let listeningInfoText = `**${this.currentLoopState === LoopState.NONE ? ':radio_button: No Loop' : this.currentLoopState === LoopState.QUEUE ? ':repeat: Queue Loop' : ':repeat_one: Song Loop'}**\n:loud_sound: **${this.volume}%**`;
        embed.addFields([
            {
                name: '***Active Queue***',
                value: activeQueueText
            },
            {
                name: '***Listening Info***',
                value: listeningInfoText
            }
        ]);
        return embed;
    }
    index(index) {
        this.queueIndex = index;
        this.connection.dispatcher.end();
    }
    add(song) {
        this.queue.push(song);
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.play(song);
        }
    }
    skip() {
        this.connection.dispatcher.end();
    }
    stop() {
        this.queue = [];
        this.voiceChannel.leave();
    }
    pause() {
        this.isPlaying = false;
        this.connection.dispatcher.pause();
    }
    resume() {
        this.isPlaying = true;
        this.connection.dispatcher.resume();
    }
    togglePause() {
        this.isPlaying ? this.pause() : this.resume();
    }
    pauseStatus() {
        return this.isPlaying ? ':arrow_forward: **Playing**' : ':pause_button: **Paused**';
    }
    toggleLoop() {
        this.currentLoopState = this.currentLoopState++ < 2 ? this.currentLoopState : 0;
    }
    loopStatus() {
        return this.currentLoopState === LoopState.NONE ? ':radio_button: **No longer looping!**' : this.currentLoopState === LoopState.QUEUE ? ':repeat: **Now looping through queue!**' : ':repeat_one: **Now looping the current song!**';
    }
    setVolume(newVolume) {
        this.volume = newVolume;
        this.connection.dispatcher.emit('volumeChange');
    }
}
exports.MusicClient = MusicClient;
//# sourceMappingURL=MusicClient.js.map