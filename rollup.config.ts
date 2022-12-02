import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

import pkg from './package.json' assert { type: 'json' };

const { main, module, typings } = pkg;

const input = 'src/index.ts';
const target = 'es2017';
const plugins = [esbuild({ target })];

export default defineConfig([
    {
        input,
        plugins,
        external: ['fs-extra', 'path', 'esbuild'],
        output: [
            {
                format: 'esm',
                file: module,
            },
            {
                format: 'cjs',
                file: main,
            },
        ],
    },
    {
        input,
        plugins: [dts()],
        output: {
            format: 'esm',
            file: typings,
        },
    },
]);
