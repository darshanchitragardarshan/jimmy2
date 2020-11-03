import { TaskManager, Constants, Logger, PlatformManager } from 'rnv';
import { SDKTizen } from '../sdks';

const { logErrorPlatform } = PlatformManager;
const { logTask, logRaw } = Logger;
const {
    TIZEN,
    TASK_RUN,
    TASK_CONFIGURE,
    PARAMS
} = Constants;
const { runTizenProject } = SDKTizen;
const { executeOrSkipTask } = TaskManager;

export const taskRnvRun = async (c, parentTask, originTask) => {
    const { platform } = c;
    const { port } = c.runtime;
    const { target } = c.runtime;
    const { hosted } = c.program;
    logTask('taskRnvRun', `parent:${parentTask} port:${port} target:${target} hosted:${hosted}`);

    await executeOrSkipTask(c, TASK_CONFIGURE, TASK_RUN, originTask);

    switch (platform) {
        case TIZEN:
            return runTizenProject(c);
        default:
            return logErrorPlatform(c);
    }
};

export const taskRnvRunHelp = async () => {
    logRaw(`
More info at: https://renative.org/docs/api-cli
`);
};

const Task = {
    description: 'Run your app on target device or emulator',
    fn: taskRnvRun,
    fnHelp: taskRnvRunHelp,
    task: 'run',
    dependencies: {
        before: TASK_CONFIGURE
    },
    params: PARAMS.withBase(PARAMS.withConfigure(PARAMS.withRun())),
    platforms: [
        TIZEN
    ],
};

export default Task;
