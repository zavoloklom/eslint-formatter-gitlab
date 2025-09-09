import { createHash } from 'node:crypto';
import { relative } from 'node:path';

import type { Severity } from './types.d.ts';
import type { ESLint } from 'eslint';

export const getRelativePath = (path: string, context: ESLint.LintResultData): string => {
  // Could be adjusted
  // const root = process.env.CI_PROJECT_DIR ?? context.cwd;
  return relative(context.cwd, path);
};

export const generateFingerprint = (data: (string | null)[], hashes: Set<string>): string => {
  // eslint-disable-next-line sonarjs/hashing
  const hash = createHash('md5');

  for (const part of data) {
    if (!part) continue;
    hash.update(part.toString());
  }

  // Hash collisions should not happen, but if they do, a random hash will be generated.
  const hashCopy = hash.copy();
  let digest = hash.digest('hex');
  if (hashes.has(digest)) {
    // eslint-disable-next-line sonarjs/pseudo-random
    hashCopy.update(Math.random().toString());
    digest = hashCopy.digest('hex');
  }

  hashes.add(digest);

  return digest;
};

export const determineSeverity = (severityCode: number, isFatal?: true): Severity => {
  if (isFatal === true) return 'critical';

  switch (severityCode) {
    case 1:
      return 'minor';
    case 2:
      return 'major';
    default:
      return 'info';
  }
};
