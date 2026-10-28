import fs from 'fs';
import path from 'path';
import { logger } from '../utils/logger.js';

export function scanDockerfile(filePath: string): boolean {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    let hasVulnerabilities = false;

    // זיהוי שימוש בתגית latest
    if (/^FROM\s+.*:latest/mi.test(content) || /^FROM\s+[^\s:]+$/mi.test(content)) {
      logger.error(`Security Risk in ${path.basename(filePath)}: Using 'latest' or implicit tag. Pin a specific version.`);
      hasVulnerabilities = true;
    }

    // זיהוי היעדר הגדרת משתמש (מה שגורם להרצת הקונטיינר כ-root)
    if (!/^USER\s+(?!root)/mi.test(content)) {
      logger.error(`Security Risk in ${path.basename(filePath)}: No non-root USER defined. Container will run as root!`);
      hasVulnerabilities = true;
    }

    return hasVulnerabilities;
  } catch (error) {
    return false;
  }
}