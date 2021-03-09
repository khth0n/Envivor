import { getRandomInt, retrieve, save } from '..';

interface TriggerRecord {
    [key: string]: string[];
}

class TriggerSystem {

    record: TriggerRecord = {};

    constructor(readonly serverID: string, triggerRecord?: TriggerRecord){

        if(triggerRecord){
            this.record = triggerRecord;
        }
    }

    addResponse(trigger: string, response: string){

        let responses = this.getResponses(trigger);

        if(!responses){
            this.record[trigger] = [response]
        } else {
            this.record[trigger].push(response);
        }

        saveTriggerSystem(this.serverID);
    }

    deleteTrigger(trigger: string): boolean {

        let responses = this.getResponses(trigger);

        if(responses){
            delete this.record[trigger];
            saveTriggerSystem(this.serverID);

            return true;
        }

        return false;
    }

    deleteResponse(trigger: string, response: string): boolean{

        let responses = this.getResponses(trigger);

        if(!responses){
            return false;
        }

        let index = responses.indexOf(response);

        responses.splice(index, 1);

        if(responses.length < 1){
            delete this.record[trigger];
        }

        saveTriggerSystem(this.serverID);

        return true;
    }

    getResponse(trigger: string){

        let responses = this.getResponses(trigger);

        return responses[getRandomInt(responses.length)];
    }

    private getResponses(trigger: string): string[]{
        return this.record[trigger];
    }
}

interface TriggerSystemRecord {
    [key: string]: TriggerSystem;
}

var triggerSystemRecord: TriggerSystemRecord = {};

async function getTriggers(){
    let triggerSystems = await retrieve('./local/triggers', [], '.json');

    for(const triggerSystem of triggerSystems){
        let { serverID, record }: TriggerSystem = triggerSystem;

        triggerSystemRecord[serverID] = new TriggerSystem(serverID, record);
    }
}

async function saveTriggerSystem(serverID: string){
    save(triggerSystemRecord[serverID], `./local/triggers/${serverID}.json`);
}

export {
    TriggerSystem,
    triggerSystemRecord,
    saveTriggerSystem
}