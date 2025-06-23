import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';

export default [
  // Main package
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ 
        tsconfig: './tsconfig.build.json',
        declaration: false,
      }),
      terser(),
    ],
    external: ['react', 'react-dom', 'react-native', 'tslib'],
  },
  // Next.js wrapper with 'use client' directive
  {
    input: 'src/nextjs/index.ts',
    output: [
      {
        file: 'dist/nextjs/index.js',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
        banner: "'use client';\n",
      },
      {
        file: 'dist/nextjs/index.esm.js',
        format: 'esm',
        sourcemap: true,
        exports: 'named',
        banner: "'use client';\n",
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ 
        tsconfig: './tsconfig.build.json',
        declaration: false,
      }),
      terser(),
    ],
    external: ['react', 'react-dom', 'react-native', 'tslib'],
  },
  // Type definitions
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
  // Type definitions for Next.js wrapper
  {
    input: 'src/nextjs/index.ts',
    output: [{ file: 'dist/nextjs/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];


