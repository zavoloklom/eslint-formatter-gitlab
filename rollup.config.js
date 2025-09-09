import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';

// eslint-disable-next-line import/no-default-export
export default [
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
      },
    ],
    plugins: [resolve(), commonjs(), typescript()],
  },
  {
    input: 'src/types.d.ts',
    output: {
      file: 'dist/types.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
];
