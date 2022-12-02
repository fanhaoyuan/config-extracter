import type { ResolveOptions } from './interfaces';
import * as fs from 'fs-extra';
import * as path from 'path';
import { tsResolver } from './ts-resolver';

export async function extract<T extends Record<string, any>>(options: ResolveOptions = {}): Promise<T | undefined> {
    let file = options.file;

    if (!file) {
        return;
    }

    if (typeof file === 'string') {
        file = [file];
    }

    file = file.find(f => {
        return fs.pathExistsSync(f);
    });

    if (!file) {
        return;
    }

    const extname = path.extname(file);

    if (extname === ',js') {
        return require(file);
    }

    if (extname === '.ts') {
        return tsResolver<T>(file);
    }
}
