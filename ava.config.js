export default {
    files: ['tests/**/*.spec.ts'],
    extensions: {
        ts: 'module'
    },
    nodeArguments: [
        '--import=tsimp/import',
    ],
    timeout: '2m',
    serial: true,
    concurrency: 1,
};
