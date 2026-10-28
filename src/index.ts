#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { scanCommand } from './commands/scan.js';

const program = new Command();

program
  .name('zeroguard')
  .description('Zero-config DevSecOps & QA CLI for indie hackers and solo devs')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize ZeroGuard in your current project')
  .action(() => {
    initCommand();
  });

program
  .command('scan')
  .description('Scan project for security vulnerabilities and hardcoded secrets')
  .action(() => {
    scanCommand();
  });

program.parse(process.argv);