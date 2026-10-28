import fs from 'fs';
import path from 'path';
import { logger } from '../utils/logger.js';

export function ciCommand() {
  logger.title('ZeroGuard - CI/CD Generator');
  logger.info('Generating GitHub Actions workflow...');

  const githubDir = path.join(process.cwd(), '.github');
  const workflowsDir = path.join(githubDir, 'workflows');
  const workflowFile = path.join(workflowsDir, 'zeroguard.yml');

  if (!fs.existsSync(githubDir)) fs.mkdirSync(githubDir);
  if (!fs.existsSync(workflowsDir)) fs.mkdirSync(workflowsDir);

  const yamlContent = `name: ZeroGuard Security CI

on:
  push:
    branches: [ "main", "master" ]
  pull_request:
    branches: [ "main", "master" ]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Run ZeroGuard Scan
        run: npx zeroguard-cli scan
`;

  try {
    fs.writeFileSync(workflowFile, yamlContent);
    logger.success('GitHub Actions workflow created at .github/workflows/zeroguard.yml');
    logger.info('Your project is now protected in the cloud!');
  } catch (error) {
    logger.error('Failed to create CI/CD configuration.');
  }
}