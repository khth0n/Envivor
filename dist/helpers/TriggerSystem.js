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
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveTriggerSystem = exports.triggerSystemRecord = exports.TriggerSystem = void 0;
const __1 = require("..");
class TriggerSystem {
    constructor(serverID, triggerRecord) {
        this.serverID = serverID;
        this.record = {};
        if (triggerRecord) {
            this.record = triggerRecord;
        }
    }
    addResponse(trigger, response) {
        let responses = this.getResponses(trigger);
        if (!responses) {
            this.record[trigger] = [response];
        }
        else {
            this.record[trigger].push(response);
        }
        saveTriggerSystem(this.serverID);
    }
    deleteTrigger(trigger) {
        let responses = this.getResponses(trigger);
        if (responses) {
            delete this.record[trigger];
            saveTriggerSystem(this.serverID);
            return true;
        }
        return false;
    }
    deleteResponse(trigger, response) {
        let responses = this.getResponses(trigger);
        if (!responses) {
            return false;
        }
        let index = responses.indexOf(response);
        responses.splice(index, 1);
        if (responses.length < 1) {
            delete this.record[trigger];
        }
        saveTriggerSystem(this.serverID);
        return true;
    }
    getResponse(trigger) {
        let responses = this.getResponses(trigger);
        return responses[__1.getRandomInt(responses.length)];
    }
    getResponses(trigger) {
        return this.record[trigger];
    }
}
exports.TriggerSystem = TriggerSystem;
var triggerSystemRecord = {};
exports.triggerSystemRecord = triggerSystemRecord;
function getTriggers() {
    return __awaiter(this, void 0, void 0, function* () {
        let triggerSystems = yield __1.retrieve('./local/triggers', [], '.json');
        for (const triggerSystem of triggerSystems) {
            let { serverID, record } = triggerSystem;
            triggerSystemRecord[serverID] = new TriggerSystem(serverID, record);
        }
    });
}
function saveTriggerSystem(serverID) {
    return __awaiter(this, void 0, void 0, function* () {
        __1.save(triggerSystemRecord[serverID], `./local/triggers/${serverID}.json`);
    });
}
exports.saveTriggerSystem = saveTriggerSystem;
//# sourceMappingURL=TriggerSystem.js.map