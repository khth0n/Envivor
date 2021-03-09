"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAuthError = exports.isOK = exports.AuthCodex = void 0;
const chatCleaner_1 = require("./chatCleaner");
var AuthCodex;
(function (AuthCodex) {
    AuthCodex[AuthCodex["ERROR"] = 0] = "ERROR";
    AuthCodex[AuthCodex["NOT_IN_VOICE"] = 1] = "NOT_IN_VOICE";
    AuthCodex[AuthCodex["PERMISSIONS"] = 2] = "PERMISSIONS";
    AuthCodex[AuthCodex["PRIVILEGES"] = 3] = "PRIVILEGES";
    AuthCodex[AuthCodex["OK"] = 4] = "OK";
})(AuthCodex = exports.AuthCodex || (exports.AuthCodex = {}));
function isOK(value) {
    return value === AuthCodex.OK;
}
exports.isOK = isOK;
function sendAuthError(msg, text, authError) {
    chatCleaner_1.clean(msg, `${text} Issue ${AuthCodex[authError]}`);
}
exports.sendAuthError = sendAuthError;
//# sourceMappingURL=authCodex.js.map