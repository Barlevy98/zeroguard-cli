import fs from 'fs';
import { logger } from '../utils/logger.js';

const SECRET_PATTERNS = [
  { name: 'AWS Access Key', regex: /AKIA[0-9A-Z]{16}/ },
  { name: 'Stripe Secret Key', regex: /sk_(test|live)_[0-9a-zA-Z]{24}/ },
  { name: 'Generic API Key', regex: /(api_key|apikey|secret)[-_'"]*[:=][\s'"]*[a-zA-Z0-9\-_]{16,}/i }
];

export function scanFileForSecrets(filePath: string): boolean {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    let foundSecrets = false;

    SECRET_PATTERNS.forEach(pattern => {
      if (pattern.regex.test(content)) {
        logger.error(`Found potential ${pattern.name} in file: ${filePath}`);
        foundSecrets = true;
      }
    });

    return foundSecrets;
  } catch (error) {
    return false;
  }
}