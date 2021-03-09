import { Client, Activity, PresenceData } from "discord.js";

enum BotActivityTypes {
    PLAYING,
    STREAMING,
    LISTENING,
    WATCHING,
    COMPETING = 5
}

interface BotActivity {
    name: string,
    type?: keyof typeof BotActivityTypes,
    url?: string
}

export function setPresence(client: Client, [ activityName, activityType, activityURL ]: string[]){

    const user = client.user; 
    if(!user) return;

    let activity: BotActivity = {
        name: activityName
    }

    if(activityType in BotActivityTypes){
        activity.type = activityType as keyof typeof BotActivityTypes;
    }

    if(activityURL){
        activity.url = activityURL;
    }

    let presence: PresenceData = {
        activity,
    }

    user.setPresence(presence);
}


