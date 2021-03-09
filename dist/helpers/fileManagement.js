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
exports.save = exports.retrieve = void 0;
const path_1 = require("path");
const { readdir, writeFile } = require('fs').promises;
function retrieve(dir, fileArr, desiredExtension, isRecursive) {
    return __awaiter(this, void 0, void 0, function* () {
        let dirents = yield readdir(dir, { withFileTypes: true });
        let directories = dirents.filter((value, index, arr) => {
            if (value.isDirectory()) {
                return true;
            }
            if (!desiredExtension || value.name.endsWith(desiredExtension)) {
                let file = require(path_1.resolve(dir, value.name));
                fileArr.push(file);
            }
            return false;
        });
        if (isRecursive) {
            for (const directory of directories) {
                let newDir = path_1.resolve(dir, directory.name);
                yield retrieve(newDir, fileArr, desiredExtension, isRecursive);
            }
        }
        return fileArr;
    });
}
exports.retrieve = retrieve;
function save(data, path) {
    return __awaiter(this, void 0, void 0, function* () {
        let jsonData = JSON.stringify(data, null, 2);
        try {
            writeFile(path, jsonData);
            console.log('Successfully wrote file!');
        }
        catch (error) {
            console.log('Error writing file: ', error);
        }
    });
}
exports.save = save;
//# sourceMappingURL=fileManagement.js.map