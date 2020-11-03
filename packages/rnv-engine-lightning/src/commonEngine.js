import path from 'path';
import { Common, FileUtils } from 'rnv';

const { getAppFolder, getTemplateDir } = Common;
const { copyFolderContentsRecursiveSync } = FileUtils;

export const getPlatformBuildDir = (c, isRelativePath) => getAppFolder(c, isRelativePath);

export const getPlatformOutputDir = (c) => {
    const dir = getPlatformBuildDir(c);
    let output;
    switch (c.platform) {
        default:
            output = dir;
    }
    return output;
};

export const getOriginalPlatformTemplatesDir = () => path.join(__dirname, '../platformTemplates');

export const getTemplateProjectDir = (c) => {
    const dir = getTemplateDir(c);
    let output;
    switch (c.platform) {
        default:
            output = dir;
    }
    return output;
};

export const getTemplateRootDir = (c, platform) => {
    const dir = c.paths.project.platformTemplatesDirs[platform];
    return dir;
};

export const ejectPlatform = (c, platform, destFolder) => {
    const sourcePlatformDir = getTemplateRootDir(c, platform);
    copyFolderContentsRecursiveSync(
        path.join(sourcePlatformDir, platform),
        destFolder
    );
    copyFolderContentsRecursiveSync(
        path.join(sourcePlatformDir, '_shared'),
        destFolder
    );
};

export const getPlatformProjectDir = (c) => {
    const dir = getPlatformBuildDir(c);
    let output;
    switch (c.platform) {
        default:
            output = dir;
    }
    return output;
};
