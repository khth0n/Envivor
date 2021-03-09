import { MessageEmbed } from 'discord.js';

/**
 * Class that acts as a ballot template.
 * @class
 */
class Ballot {

    embed;
    
    /**
     * Creates a new ballot for use by other voting commands.
     * @param color
     * @param title
     */
    constructor(color: number, title: string){
        this.embed = new MessageEmbed({
            color: color,
            title: title
        });
    }


}