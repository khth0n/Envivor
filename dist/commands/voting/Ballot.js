"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
/**
 * Class that acts as a ballot template.
 * @class
 */
class Ballot {
    /**
     * Creates a new ballot for use by other voting commands.
     * @param color
     * @param title
     */
    constructor(color, title) {
        this.embed = new discord_js_1.MessageEmbed({
            color: color,
            title: title
        });
    }
}
//# sourceMappingURL=Ballot.js.map