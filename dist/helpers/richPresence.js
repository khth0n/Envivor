"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPresence = void 0;
var BotActivityTypes;
(function (BotActivityTypes) {
    BotActivityTypes[BotActivityTypes["PLAYING"] = 0] = "PLAYING";
    BotActivityTypes[BotActivityTypes["STREAMING"] = 1] = "STREAMING";
    BotActivityTypes[BotActivityTypes["LISTENING"] = 2] = "LISTENING";
    BotActivityTypes[BotActivityTypes["WATCHING"] = 3] = "WATCHING";
    BotActivityTypes[BotActivityTypes["COMPETING"] = 5] = "COMPETING";
})(BotActivityTypes || (BotActivityTypes = {}));
function setPresence(client, [activityName, activityType, activityURL]) {
    const user = client.user;
    if (!user)
        return;
    let activity = {
        name: activityName
    };
    if (activityType in BotActivityTypes) {
        activity.type = activityType;
    }
    if (activityURL) {
        activity.url = activityURL;
    }
    let presence = {
        activity,
    };
    user.setPresence(presence);
}
exports.setPresence = setPresence;
//# sourceMappingURL=richPresence.js.map