import gitlabCodeQualityFormatter from '../src/index.js';
import { ESLint } from 'eslint';
import test from 'ava';
import * as TJS from 'typescript-json-schema';
import { join } from 'node:path';
import { Schema } from 'ajv/lib/types';
import { Ajv } from 'ajv';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Get the directory name from the URL of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Mock ESLint results
const mockResults: ESLint.LintResult[] = [{
    filePath: '/path/to/file.js',
    messages: [
        {
            ruleId: 'no-unused-vars',
            message: 'Unused variable "x"',
            line: 10,
            column: 5,
            severity: 2
        },
        {
            ruleId: 'no-unused-vars',
            message: 'Unused variable "x"',
            line: 10,
            column: 7,
            severity: 1
        }
    ],
    suppressedMessages: [],
    errorCount: 1,
    fatalErrorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
    usedDeprecatedRules: []
}];

// Simulated context
const context: ESLint.LintResultData = {
    cwd: '/path/to',
    rulesMeta: {}
};

const report = [
    {
        'type': 'issue',
        'check_name': 'no-unused-vars',
        'description': 'Unused variable "x"',
        'content': {
            'body': 'Error found in no-unused-vars'
        },
        'categories': ['Style'],
        'location':
            {
                'path': 'file.js',
                'lines': {
                    'begin': 10,
                    'end': 10
                },
                'positions':
                    {
                        'begin': {
                            'line': 10,
                            'column': 5
                        },
                        'end': {
                            'line': 10,
                            'column': 5
                        }
                    }
            },
        'severity': 'major',
        'fingerprint': '2da2ccead5f790e94c0fd575ca9f87b1'
    },
    {
        'type': 'issue',
        'check_name': 'no-unused-vars',
        'description': 'Unused variable "x"',
        'content': {
            'body': 'Error found in no-unused-vars'
        },
        'categories': ['Style'],
        'location':
            {
                'path': 'file.js',
                'lines': {
                    'begin': 10,
                    'end': 10
                },
                'positions':
                    {
                        'begin': {
                            'line': 10,
                            'column': 7
                        },
                        'end': {
                            'line': 10,
                            'column': 7
                        }
                    }
            },
        'severity': 'minor',
        'fingerprint': 'dce1389fc83c3223f1a27e7a6899c54e'
    }
];

test('gitlabCodeQualityFormatter returns correct report', t => {
    const generatedReport = gitlabCodeQualityFormatter(mockResults, context);
    t.is(generatedReport, JSON.stringify(report));

    // Validate result with schema
    const program = TJS.getProgramFromFiles(
        [join(__dirname, '../src/types.d.ts')]
    );
    const schema = TJS.generateSchema(program, 'Issue', {}) as Schema;
    const ajv = new Ajv({ strict: false });
    const validate = ajv.compile(schema);

    const messages = JSON.parse(generatedReport);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allValid = messages.every((message: any) => {
        const valid = validate(message);
        if (!valid) {
            console.log(validate.errors);
        }
        return valid;
    });

    t.true(allValid, 'JSON data is valid according to the schema');
});
