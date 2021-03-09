import { Message, MessageEmbed, TextChannel, VoiceChannel, VoiceConnection } from 'discord.js';
import ytdl from 'ytdl-core';
import { Song, MusicClient } from './MusicClient';
import { clean, AuthCodex, isOK, sendAuthError } from '..';

class MusicObserver {
    private clientMap = new Map<string, MusicClient>(); 

    private async createClient({ member, guild, channel }: Message, voice: VoiceChannel, url: string): Promise<MusicClient> {


        const serverID = guild!.id;

        const voiceConnection = await voice.join();

        const client = new MusicClient(serverID, channel as TextChannel, voice, voiceConnection);

        this.clientMap.set(serverID, client);

        return client;
    }

    private getClient(serverID: string): MusicClient | string {
        return this.clientMap.get(serverID) || 'There is no active queue!';
    }

    private async getSong(url: string): Promise<Song> {
        return (await ytdl.getInfo(url)).videoDetails;
    }

    public async addToClient(msg: Message, url: string): Promise<string> {

        const voice = msg.member?.voice.channel;

        if(!voice) return `Please join a voice channel to play/add music!`;

        let song = await this.getSong(url);

        song.requester = msg.author.id;

        const serverID = msg.guild!.id;
        let client = this.getClient(serverID);

        if(typeof client === 'string'){
            client = await this.createClient(msg, voice, url);
        }
        
        client.add(song);
        return `Successfully added **${song.title}** to queue!`;
    }

    public getClientQueue(serverID: string): MessageEmbed | string {
        
        const client = this.getClient(serverID);

        if(typeof client === 'string') return client;

        return client.getQueue();
    }

    public pauseClient(serverID: string){

        const client = this.getClient(serverID);

        if(typeof client === 'string') return client;

        client.togglePause();

        return client.pauseStatus();
    }

    public loopClient(serverID: string){

        const client = this.getClient(serverID);

        if(typeof client === 'string') return client;

        client.toggleLoop();

        return client.loopStatus();
    }

    public skipClient(serverID: string){

        const client = this.getClient(serverID);

        if(typeof client === 'string') return client;

        client.skip();

        return ':fast_forward: Skipped!';
    }

    public changeClientVolume(serverID: string, newVolume: number){

        const client = this.getClient(serverID);

        if(typeof client === 'string') return client;

        client.setVolume(newVolume);

        return `:loud_sound: **Volume is now set to ${newVolume}%**`;
    }

    public closeClient(serverID: string) {

        const client = this.getClient(serverID);

        if(typeof client === 'string') return client;
        
        client.stop();

        this.clientMap.delete(serverID);

        return ':wave: Until the next jam session, friends!'
    }
}

export const observer = new MusicObserver();