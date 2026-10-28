import fs from 'fs';
import path from 'path';
import { logger } from '../utils/logger.js';

export function scanGitignore(): boolean {
  try {
    const cwd = process.cwd();
    const gitignorePath = path.join(cwd, '.gitignore');
    
    // זיהוי קבצי .env בתיקייה הראשית
    const hasEnvFiles = fs.readdirSync(cwd).some(file => file.startsWith('.env'));
    
    if (!hasEnvFiles) return false;

    if (!fs.existsSync(gitignorePath)) {
      logger.error('Security Risk: .env files found, but no .gitignore file exists!');
      return true;
    }

    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
    
    if (!gitignoreContent.includes('.env')) {
      logger.error('Security Risk: .env files are NOT ignored in .gitignore! You are about to leak secrets.');
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}