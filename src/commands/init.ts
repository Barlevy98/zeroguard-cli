import fs from 'fs';
import path from 'path';
import { logger } from '../utils/logger.js';

export function initCommand() {
  logger.title('ZeroGuard CLI - Initialization');
  logger.info('Setting up ZeroGuard for your project...');

  const gitPath = path.join(process.cwd(), '.git');
  const hooksPath = path.join(gitPath, 'hooks');
  const preCommitPath = path.join(hooksPath, 'pre-commit');

  // בדיקה אם הפרויקט מחובר ל-Git
  if (!fs.existsSync(gitPath)) {
    logger.error('Not a git repository. Please run "git init" first.');
    process.exit(1);
  }

  if (!fs.existsSync(hooksPath)) {
    fs.mkdirSync(hooksPath, { recursive: true });
  }

  // הסקריפט שירוץ מאחורי הקלעים לפני כל קומיט
  const hookScript = `#!/bin/sh
# ZeroGuard Pre-commit Hook
echo "🛡️ Running ZeroGuard Security Scan..."
zeroguard scan

if [ $? -ne 0 ]; then
  echo "❌ ZeroGuard scan failed! Commit aborted to protect your secrets."
  exit 1
fi
`;

  try {
    fs.writeFileSync(preCommitPath, hookScript);
    fs.chmodSync(preCommitPath, '755'); // הפיכת הקובץ לבר-ביצוע (Executable)
    logger.success('ZeroGuard pre-commit hook installed successfully!');
    logger.info('Your code will now be scanned automatically before every commit.');
  } catch (error) {
    logger.error('Failed to install Git hook. Please check directory permissions.');
  }
}