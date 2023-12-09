import typescript from 'rollup-plugin-typescript2';

export default [
  {
    input: 'src/content/content.ts',
    output: {
      file: 'dist/content.js',
      format: 'es',
      inlineDynamicImports: true,
    },
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
      }),
    ],
  },
  {
    input: 'src/background/background.ts',
    output: {
      file: 'dist/background.js',
      format: 'es',
      inlineDynamicImports: true,
    },
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
      }),
    ],
  },
  {
    input: 'src/injected/exampleScript.ts',
    output: {
      file: 'dist/injected/exampleScript.js',
      format: 'es',
      inlineDynamicImports: true,
    },
  }
];
