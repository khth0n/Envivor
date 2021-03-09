import { TextChannel, VoiceChannel, VoiceConnection, MessageEmbed } from 'discord.js';
import ytdl from 'ytdl-core';
import { observer } from './MusicObserver';

enum LoopState {
    NONE,
    QUEUE,
    SONG
}

export interface Song {
    title: string;
    video_url: string;
    requester?: string;
}

export class MusicClient {

    private queue: Song[];
    private queueIndex = 0;
    private volume = 100;
    private isPlaying = false;
    private currentLoopState = 0;

    constructor(readonly serverID: string, readonly textChannel: TextChannel, readonly voiceChannel: VoiceChannel, readonly connection: VoiceConnection){
        this.queue = [];
    }

    private async play({ video_url }: Song){

        const dispatcher = this.connection.play(ytdl(video_url, { quality: 140 }));

        const queueMessage = await this.textChannel.send(this.getQueue());

        dispatcher.on('finish', () => {

            if(this.currentLoopState < LoopState.SONG){
                this.queueIndex++;
            }

            queueMessage.delete();

            if(this.queueIndex >= this.queue.length){
                if(this.currentLoopState === LoopState.QUEUE){
                    this.queueIndex = 0;
                } else {
                    observer.closeClient(this.serverID);
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
    }

    public getQueue(): MessageEmbed {

        const { title: currentTitle, video_url: currentURL, requester } = this.queue[this.queueIndex];

        let embed = new MessageEmbed({
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
        for(let i = this.queueIndex + 1; activeQueueText.length < 3000 && i < this.queue.length; i++){
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

    public index(index: number){
        this.queueIndex = index;
        this.connection.dispatcher.end();
    }

    public add(song: Song){
        this.queue.push(song);

        if(!this.isPlaying){
            this.isPlaying = true;
            this.play(song);
        }
    }

    public skip(){
        this.connection.dispatcher.end();
    }

    public stop(){
        this.queue = [];

        this.voiceChannel.leave();
    }

    private pause(){
        this.isPlaying = false;
        this.connection.dispatcher.pause();
    }

    private resume(){
        this.isPlaying = true;
        this.connection.dispatcher.resume();
    }

    public togglePause(){
        this.isPlaying ? this.pause() : this.resume();
    }

    public pauseStatus(): string{
        return this.isPlaying ? ':arrow_forward: **Playing**' : ':pause_button: **Paused**';
    }

    public toggleLoop(){
        this.currentLoopState = this.currentLoopState++ < 2 ? this.currentLoopState : 0;
    }

    public loopStatus(): string {
        return this.currentLoopState === LoopState.NONE ? ':radio_button: **No longer looping!**' : this.currentLoopState === LoopState.QUEUE ? ':repeat: **Now looping through queue!**' : ':repeat_one: **Now looping the current song!**'
    }

    public setVolume(newVolume: number){
        this.volume = newVolume;
        this.connection.dispatcher.emit('volumeChange');
    }
}