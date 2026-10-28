import fs from 'fs';
import path from 'path';
import { logger } from '../utils/logger.js';
import { scanFileForSecrets } from '../scanners/secrets.js';
import { scanDockerfile } from '../scanners/docker.js';

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
  logger.info('Scanning project files for vulnerabilities...');

  const allFiles = getAllFiles(process.cwd());
  let hasErrors = false;

  allFiles.forEach(file => {
     const ext = path.extname(file);
     const basename = path.basename(file);

     // סריקת סודות רגילה
     if (['.js', '.ts', '.json', '.env', '.txt'].includes(ext) || basename.includes('.env')) {
       if (scanFileForSecrets(file)) hasErrors = true;
     }

     // סריקת Dockerfile
     if (basename === 'Dockerfile' || basename.includes('Dockerfile.')) {
       if (scanDockerfile(file)) hasErrors = true;
     }
  });

  if (hasErrors) {
     logger.error('\nScan failed: Vulnerabilities detected!');
     process.exit(1);
  } else {
     logger.success('Scan passed: Code is secure and ready.');
  }
}