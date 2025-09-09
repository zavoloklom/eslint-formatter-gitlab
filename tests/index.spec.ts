/* eslint-disable sonarjs/no-duplicate-string */
import { Ajv } from 'ajv';
import { Schema } from 'ajv/lib/types';
import test from 'ava';
import { ESLint } from 'eslint';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as TJS from 'typescript-json-schema';

import gitlabCodeQualityFormatter from '../src/index.js';

// Get the directory name from the URL of the current module
// eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
const __dirname = dirname(fileURLToPath(import.meta.url));

// Mock ESLint results
const mockResults: ESLint.LintResult[] = [
  {
    filePath: '/path/to/file.js',
    messages: [
      {
        ruleId: 'no-unused-vars',
        message: 'Unused variable "x"',
        line: 10,
        column: 5,
        severity: 2,
      },
      {
        ruleId: 'no-unused-vars',
        message: 'Unused variable "x"',
        line: 10,
        column: 7,
        severity: 1,
      },
    ],
    suppressedMessages: [],
    errorCount: 1,
    fatalErrorCount: 0,
    warningCount: 0,
    fixableErrorCount: 0,
    fixableWarningCount: 0,
    usedDeprecatedRules: [],
  },
];

// Mock ESLint context
const context: ESLint.LintResultData = {
  cwd: '/path/to',
  rulesMeta: {},
};

const report = [
  {
    type: 'issue',
    // eslint-disable-next-line camelcase
    check_name: 'no-unused-vars',
    description: 'Unused variable "x"',
    content: {
      body: 'Error found in no-unused-vars',
    },
    categories: ['Style'],
    location: {
      path: 'file.js',
      lines: {
        begin: 10,
        end: 10,
      },
      positions: {
        begin: {
          line: 10,
          column: 5,
        },
        end: {
          line: 10,
          column: 5,
        },
      },
    },
    severity: 'major',
    fingerprint: '2da2ccead5f790e94c0fd575ca9f87b1',
  },
  {
    type: 'issue',
    // eslint-disable-next-line camelcase
    check_name: 'no-unused-vars',
    description: 'Unused variable "x"',
    content: {
      body: 'Error found in no-unused-vars',
    },
    categories: ['Style'],
    location: {
      path: 'file.js',
      lines: {
        begin: 10,
        end: 10,
      },
      positions: {
        begin: {
          line: 10,
          column: 7,
        },
        end: {
          line: 10,
          column: 7,
        },
      },
    },
    severity: 'minor',
    fingerprint: 'dce1389fc83c3223f1a27e7a6899c54e',
  },
];

test('gitlabCodeQualityFormatter returns correct report', (t) => {
  const generatedReport = gitlabCodeQualityFormatter(mockResults, context);
  t.is(generatedReport, JSON.stringify(report));

  // Validate result with schema
  const program = TJS.getProgramFromFiles([join(__dirname, '../src/types.d.ts')]);
  const schema = TJS.generateSchema(program, 'Issue', {}) as Schema;
  const ajv = new Ajv({ strict: false });
  const validate = ajv.compile(schema);

  const messages = JSON.parse(generatedReport) as [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isAllValid = messages.every((message: any) => {
    const isValid = validate(message);
    if (!isValid) {
      // eslint-disable-next-line no-console
      console.log(validate.errors);
    }
    return isValid;
  });

  t.true(isAllValid, 'JSON data is valid according to the schema');
});
