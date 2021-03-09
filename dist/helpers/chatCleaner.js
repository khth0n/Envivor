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
exports.clean = void 0;
function messageDelete(msg, delay) {
    msg.delete({ timeout: delay || 4000 }).catch(err => { console.log(err); });
}
function clean(msg, text, delay) {
    return __awaiter(this, void 0, void 0, function* () {
        let time = delay || 4000;
        messageDelete(msg, time);
        if (!text)
            return;
        const message = yield msg.channel.send(text);
        messageDelete(message, time);
    });
}
exports.clean = clean;
//# sourceMappingURL=chatCleaner.js.map