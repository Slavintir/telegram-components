import { extname, resolve } from 'path';
import { promises as fs } from 'fs';
import { flatten } from 'lodash';

export class DirectoryHelper {
    static async recursiveReadDir(rootDir: string, allowedExtensions: string[]): Promise<string[]> {
        const stat = await fs.stat(rootDir);
        if (stat.isFile()) {
            return allowedExtensions.includes(extname(rootDir)) ? [rootDir] : [];
        }

        const dirs = await fs.readdir(rootDir, { withFileTypes: true });
        const pathsPromises = dirs.map(dir => DirectoryHelper.recursiveReadDir(resolve(rootDir, dir.name), allowedExtensions));

        return flatten(await Promise.all(pathsPromises));
    }
}
