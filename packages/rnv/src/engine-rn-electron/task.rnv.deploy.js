import { logTask } from '../core/systemManager/logger';
import {
    MACOS,
    WINDOWS,
    TASK_EXPORT,
    TASK_DEPLOY,
} from '../core/constants';

import { executeTask } from '../core/engineManager';

export const taskRnvDeploy = async (c, parentTask, originTask) => {
    logTask('taskRnvDeploy', `parent:${parentTask}`);

    await executeTask(c, TASK_EXPORT, TASK_DEPLOY, originTask);

    // Deploy simply trggets hook
    return true;
};

export default {
    description: 'Deploy the binary via selected deployment intgeration or buld hook',
    fn: taskRnvDeploy,
    task: 'deploy',
    params: [],
    platforms: [
        MACOS,
        WINDOWS,
    ],
};
