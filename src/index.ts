import { determineSeverity, generateFingerprint, getRelativePath } from './functions.js';

import type { Issue } from './types.d.ts';
import type { ESLint, Linter } from 'eslint';

const gitlabCodeQualityFormatter = (results: ESLint.LintResult[], context: ESLint.LintResultData): string => {
  const hashes = new Set<string>();
  const issues: Issue[] = results.flatMap((result: { messages: Linter.LintMessage[]; filePath: string }) =>
    result.messages.map((message) => ({
      type: 'issue',
      // eslint-disable-next-line camelcase
      check_name: message.ruleId ?? 'unknown_rule',
      description: message.message,
      content: {
        body: `Error found in ${message.ruleId}`,
      },
      categories: ['Style'],
      location: {
        path: getRelativePath(result.filePath, context),
        lines: {
          begin: message.line,
          end: message.endLine ?? message.line,
        },
        positions: {
          begin: {
            line: message.line,
            column: message.column,
          },
          end: {
            line: message.endLine ?? message.line,
            column: message.endColumn ?? message.column,
          },
        },
      },
      severity: determineSeverity(message.severity, message.fatal),
      fingerprint: generateFingerprint(
        [result.filePath, message.ruleId, message.message, `${message.line}`, `${message.column}`],
        hashes,
      ),
    })),
  );

  return JSON.stringify(issues);
};

// eslint-disable-next-line import/no-default-export
export default gitlabCodeQualityFormatter;
