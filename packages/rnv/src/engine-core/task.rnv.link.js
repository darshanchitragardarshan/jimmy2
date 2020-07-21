import path from 'path';
import { doResolve } from '../core/resolve';
import { logWarning, logTask } from '../core/systemManager/logger';
import {
    copyFolderContentsRecursiveSync, fsExistsSync, fsReadFileSync
} from '../core/systemManager/fileutils';

export const taskRnvLink = (c, parentTask, originTask) => new Promise((resolve) => {
    logTask('taskRnvLink', `parent:${parentTask} origin:${originTask}`);

    if (fsExistsSync(c.paths.project.npmLinkPolyfill)) {
        const l = JSON.parse(
            fsReadFileSync(c.paths.project.npmLinkPolyfill).toString()
        );
        Object.keys(l).forEach((key) => {
            const source = path.resolve(l[key]);
            const nm = path.join(source, 'node_modules');
            const dest = doResolve(key);
            if (fsExistsSync(source)) {
                copyFolderContentsRecursiveSync(source, dest, false, [nm]);
            } else {
                logWarning(`Source: ${source} doesn't exists!`);
            }
        });
    } else {
        logWarning(
            `${c.paths.project.npmLinkPolyfill} file not found. nothing to link!`
        );
        resolve();
    }
});

export default {
    description: '',
    fn: taskRnvLink,
    task: 'link',
    subTask: null,
    params: [],
    platforms: [],
};