"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticator = exports.AuthCodex = void 0;
const chatCleaner_1 = __importDefault(require("./chatCleaner"));
var AuthCodex;
(function (AuthCodex) {
    AuthCodex[AuthCodex["ERROR"] = 0] = "ERROR";
    AuthCodex[AuthCodex["NOT_IN_VOICE"] = 1] = "NOT_IN_VOICE";
    AuthCodex[AuthCodex["PERMISSIONS"] = 2] = "PERMISSIONS";
    AuthCodex[AuthCodex["PRIVILEGES"] = 3] = "PRIVILEGES";
    AuthCodex[AuthCodex["OK"] = 4] = "OK";
})(AuthCodex || (AuthCodex = {}));
exports.AuthCodex = AuthCodex;
class Authenticator {
    static isOK(value) {
        return value === AuthCodex.OK;
    }
    static sendError(msg, text, authError) {
        chatCleaner_1.default(msg, `${text} Issue ${AuthCodex[authError]}`);
    }
}
exports.Authenticator = Authenticator;
//# sourceMappingURL=AuthCodex.js.map