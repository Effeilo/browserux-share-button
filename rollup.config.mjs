import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/browserux-share-button.esm.js',
        format: 'es',
        sourcemap: true
      },
      {
        file: 'dist/browserux-share-button.umd.js',
        format: 'umd',
        name: 'BrowseruxShareButton',
        sourcemap: true
      },
      {
        file: 'dist/browserux-share-button.min.js',
        format: 'umd',
        name: 'BrowseruxShareButton',
        plugins: [terser()],
        sourcemap: false
      }
    ],
    plugins: [
      nodeResolve(),
      typescript({ tsconfig: './tsconfig.json' })
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/browserux-share-button.d.ts',
      format: 'es'
    },
    plugins: [dts()]
  }
];