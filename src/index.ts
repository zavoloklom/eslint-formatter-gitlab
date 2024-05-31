import { ESLint } from 'eslint';
import type { Issue } from './types.d.ts';
import { getRelativePath, generateFingerprint, determineSeverity } from './functions.js';

const gitlabCodeQualityFormatter = (results: ESLint.LintResult[], context: ESLint.LintResultData): string => {
    const hashes: Set<string> = new Set();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const issues: Issue[] = results.flatMap((result: { messages: any[]; filePath: string; }) =>
        result.messages.map(message => ({
            type: 'issue',
            check_name: message.ruleId || 'unknown_rule',
            description: message.message,
            content: {
                body: `Error found in ${message.ruleId}`
            },
            categories: ['Style'],
            location: {
                path: getRelativePath(result.filePath, context),
                lines: {
                    begin: message.line,
                    end: message.endLine || message.line
                },
                positions: {
                    begin: {
                        line: message.line,
                        column: message.column
                    },
                    end: {
                        line: message.endLine || message.line,
                        column: message.endColumn || message.column
                    }
                }
            },
            severity: determineSeverity(message.severity, message.fatal),
            fingerprint: generateFingerprint([result.filePath, message.ruleId, message.message, `${message.line}`, `${message.column}`], hashes),
        }))
    );

    return JSON.stringify(issues);
};


export default gitlabCodeQualityFormatter;
