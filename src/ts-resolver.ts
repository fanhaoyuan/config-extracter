import { build } from 'esbuild';
import * as fs from 'fs-extra';
import * as path from 'path';

export async function tsResolver<T extends Record<string, any>>(file: string): Promise<T | undefined> {
    const { outputFiles } = await build({
        entryPoints: [file],
        outdir: 'out.js',
        write: false,
        platform: 'node',
        bundle: true,
        format: 'cjs',
        plugins: [
            {
                name: 'externalize-deps',
                setup(b) {
                    b.onResolve({ filter: /.*/ }, args => {
                        const id = args.path;
                        if (id[0] !== '.' && !path.isAbsolute(id)) {
                            return {
                                external: true,
                            };
                        }
                    });
                },
            },
        ],
    });

    const tempFilePath = path.resolve(__dirname, 'config.js');

    fs.writeFileSync(tempFilePath, outputFiles[0].text, 'utf-8');

    const config = require(tempFilePath).default;

    fs.removeSync(tempFilePath);

    return config;
}
