"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryHelper = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const lodash_1 = require("lodash");
class DirectoryHelper {
    static async recursiveReadDir(rootDir, allowedExtensions) {
        const stat = await fs_1.promises.stat(rootDir);
        if (stat.isFile()) {
            return allowedExtensions.includes(path_1.extname(rootDir)) ? [rootDir] : [];
        }
        const dirs = await fs_1.promises.readdir(rootDir, { withFileTypes: true });
        const pathsPromises = dirs.map(dir => DirectoryHelper.recursiveReadDir(path_1.resolve(rootDir, dir.name), allowedExtensions));
        return lodash_1.flatten(await Promise.all(pathsPromises));
    }
}
exports.DirectoryHelper = DirectoryHelper;
//# sourceMappingURL=directory.js.map