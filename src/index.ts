#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { scanCommand } from './commands/scan.js';
import { ciCommand } from './commands/ci.js';

const program = new Command();

program
  .name('zeroguard')
  .description('Zero-config DevSecOps & QA CLI for indie hackers and solo devs')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize ZeroGuard in your current project (Pre-commit hook)')
  .action(() => {
    initCommand();
  });

program
  .command('scan')
  .description('Scan project for security vulnerabilities and hardcoded secrets')
  .action(() => {
    scanCommand();
  });

program
  .command('ci')
  .description('Generate a free GitHub Actions CI/CD pipeline')
  .action(() => {
    ciCommand();
  });

program.parse(process.argv);