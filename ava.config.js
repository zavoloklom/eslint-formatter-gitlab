// eslint-disable-next-line import/no-default-export
export default {
  files: ['tests/**/*.spec.ts'],
  extensions: {
    ts: 'module',
  },
  nodeArguments: ['--import=tsimp/import'],
  environmentVariables: {
    TSIMP_DIAG: 'ignore',
  },
  timeout: '2m',
  serial: true,
  concurrency: 1,
};
