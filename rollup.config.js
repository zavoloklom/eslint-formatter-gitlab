import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { dts } from 'rollup-plugin-dts';

const config = [
    {
        input: './src/index.ts',
        output: [
            {
                file: 'dist/bundle.cjs',
                format: 'cjs',
            },
            {
                file: 'dist/bundle.mjs',
                format: 'esm',
            }
        ],
        plugins: [
            resolve(),
            commonjs(),
            typescript()
        ]
    },
    {
        input: 'src/types.d.ts',
        output: {
            file: 'dist/types.d.ts',
            format: 'es'
        },
        plugins: [dts()],
    }
];

export default config;
