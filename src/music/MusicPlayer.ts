import { Channel, Guild, Message, TextChannel, VoiceChannel, VoiceConnection } from 'discord.js';
import CommandHandler from '../BasicCommandHandler';
import cleaner from '../chatCleaner';
import ytdl from 'ytdl-core';

interface Song {
    title: string;
    video_url: string;
}

interface QueueContract {
    textChannel: TextChannel;
    voiceChannel: VoiceChannel;
    connection: VoiceConnection | null;
    songs: Song[];
    volume: number;
    playing: boolean;
}

class MusicPlayer {
    queueMap: Map<string, QueueContract>;

    constructor(){
        this.queueMap = new Map<string, QueueContract>();
    }

    getServerQueue(serverID: string){
        return this.queueMap.get(serverID);
    }

    async add(msg: Message, url: string){

        const { member, guild } = msg;
        const voice = member?.voice.channel;

        if(!voice) return cleaner(msg, 'Please join a voice channel to play music!');
    

        const serverID = guild?.id;
        if(!serverID) return cleaner(msg, 'Error! Invalid guild id!');

        const serverQueue = this.getServerQueue(serverID);

        const { title, video_url } = (await ytdl.getInfo(url)).videoDetails;
        const song: Song = { title, video_url };

        if(!serverQueue) {
            const contract: QueueContract = {
                textChannel: msg.channel as TextChannel,
                voiceChannel: voice,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            }

            this.queueMap.set(serverID, contract);
            contract.songs.push(song);

            try {
                contract['connection'] = await voice.join();
                
                this.play(serverID, contract.songs[0]);
            } catch (err) {
                console.log(err);
                this.queueMap.delete(serverID);
                return cleaner(msg, 'Error! Failed to join voice!');
            }
        } else {
            serverQueue.songs.push(song);
            console.log(serverQueue);
        }
    }

    async play(serverID: string, song: Song){
        const serverQueue = this.getServerQueue(serverID);

        const dispatcher = serverQueue?.connection?.play(ytdl(song.video_url));

        dispatcher?.on('finish', () => {
            serverQueue?.songs.shift();

            const newSong = serverQueue?.songs[0];

            if(!newSong){
                serverQueue?.voiceChannel.leave();
                this.queueMap.delete(serverID);
                return;
            }
            this.play(serverID, newSong);
        });

        dispatcher?.on('error', error => console.error());

        dispatcher?.setVolumeLogarithmic(1);

        serverQueue?.textChannel.send(`Now playing: **${song.title}**`);
    }

    async skip(msg: Message){
        const { member, guild } = msg;

        if(!member?.voice.channel) return cleaner(msg, 'Please join voice to stop the music!');

        if(!guild) return;
        
        const serverQueue = this.getServerQueue(guild.id);
        
        if(!serverQueue) return cleaner(msg, 'There are no songs currently playing!');

        serverQueue.connection?.dispatcher.end();
    }

    async stop(msg: Message){
        const { member, guild } = msg;

        if(!member?.voice.channel) return cleaner(msg, 'Please join voice to stop the music!');

        if(!guild) return;

        const serverQueue = this.getServerQueue(guild.id);

        if(!serverQueue) return;

        serverQueue.songs = [];
        serverQueue.connection?.dispatcher.end();
    }
}

const jukebox = new MusicPlayer();

const { exe: execute }: CommandHandler = {
    exe(msg: Message, args: string[]){
        const item = args[0];

        switch(item){
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
}

export default execute;