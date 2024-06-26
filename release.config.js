export default {
    branches: ['main'],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/changelog',
        '@semantic-release/npm',
        [
            '@semantic-release/git',
            {
                assets: [
                    'package.json',
                    'package-lock.json',
                    'CHANGELOG.md',
                ],
                message: 'release: ${nextRelease.version} [skip ci]',
            },
        ],
        [
            '@semantic-release/gitlab',
            {
                gitlabUrl: 'https://gitlab.com',
                assets: [
                    {
                        path: 'README.md',
                        label: 'Documentation',
                    },
                    {
                        path: 'CHANGELOG.md',
                        label: 'Changelog',
                    },
                ],
            },
        ],
    ],
    preset: 'conventionalcommits',
    presetConfig: {
        types: [
            {
                type: 'build',
                section: 'Build System',
            },
            {
                type: 'chore',
                section: 'Others',
            },
            {
                type: 'ci',
                section: 'CI/CD',
            },
            {
                type: 'deps',
                section: 'Dependencies',
            },
            {
                type: 'docs',
                section: 'Documentation',
            },
            {
                type: 'feat',
                section: 'Features',
            },
            {
                type: 'fix',
                section: 'Bug Fixes',
            },
            {
                type: 'perf',
                section: 'Performance Improvements',
            },
            {
                type: 'refactor',
                section: 'Code Refactoring',
            },
            {
                type: 'revert',
                section: 'Reverts',
            },
            {
                type: 'style',
                section: 'Styling',
            },
            {
                type: 'test',
                section: 'Tests',
            },
        ],
        releaseRules: [
            {
                type: 'ci',
                release: false 
            },
            {
                type: 'style',
                release: false
            },
            {
                type: 'test',
                release: false
            },
        ],
        userUrlFormat: 'https://gitlab.com/{{user}}',
    },
};
