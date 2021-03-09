"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTrigger = void 0;
const emojiParser_1 = require("./emojiParser");
const TriggerSystem_1 = require("../commands/general/TriggerSystem");
function checkTrigger(msg) {
    let text = msg.content;
    let serverID = msg.guild.id;
    let triggerSystem = TriggerSystem_1.triggerSystemRecord[serverID];
    //console.log(triggerSystemRecord);
    if (triggerSystem) {
        for (const trigger in triggerSystem.record) {
            if (text === trigger) {
                msg.channel.send(emojiParser_1.parse(triggerSystem.getResponse(trigger)));
            }
        }
    }
}
exports.checkTrigger = checkTrigger;
//# sourceMappingURL=autoResponse.js.map