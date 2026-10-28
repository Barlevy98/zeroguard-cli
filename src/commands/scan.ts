import fs from 'fs';
import path from 'path';
import { logger } from '../utils/logger.js';
import { scanFileForSecrets } from '../scanners/secrets.js';

// פונקציית עזר למציאת כל הקבצים בתיקייה (למעט תיקיות כבדות/מערכת)
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist' && file !== '.git') {
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
      }
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

export function scanCommand() {
  logger.title('ZeroGuard - Security Scan');
  logger.info('Scanning project files for secrets...');

  const allFiles = getAllFiles(process.cwd());
  const targetExtensions = ['.js', '.ts', '.json', '.env', '.txt'];
  const filesToScan = allFiles.filter(f => targetExtensions.includes(path.extname(f)) || path.basename(f).includes('.env'));

  let hasErrors = false;

  filesToScan.forEach(file => {
     const found = scanFileForSecrets(file);
     if (found) hasErrors = true;
  });

  if (hasErrors) {
     logger.error('\nScan failed: Secrets detected in code!');
     // השורה הזו היא הקסם - היא זו שמכשילה בפועל פעולות כמו Git Commit או CI/CD 
     process.exit(1); 
  } else {
     logger.success('Scan passed: No secrets found. Code is clean.');
  }
}