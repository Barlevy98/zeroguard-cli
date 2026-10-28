# 🛡️ ZeroGuard CLI

[![npm version](https://img.shields.io/npm/v/zeroguard-cli.svg)](https://www.npmjs.com/package/zeroguard-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Zero-config DevSecOps & QA CLI for indie hackers and solo devs.**

## 🚨 The Problem
As a solo developer or indie hacker, setting up CI/CD pipelines, pre-commit hooks, and security scanners is a tedious distraction. You just want to ship your product, but one accidental `git push` with an AWS key or an unignored `.env` file can cost you thousands of dollars.

## 💡 The Solution
ZeroGuard prevents you from accidentally leaking API keys and deploying vulnerable Docker images. It injects a pre-commit hook that automatically scans your code before every commit, securing your project locally and in the cloud with literally zero configuration.

## 📦 Installation

You can run ZeroGuard directly using `npx` without installing it globally:

```bash
npx zeroguard-cli init
```

*Alternatively, install it globally:*
```bash
npm install -g zeroguard-cli
```

## 🚀 Usage & Commands

### 1. Initialize Security Hooks (`init`)
Sets up a Git pre-commit hook in your repository. Once installed, ZeroGuard will automatically scan your files every time you run `git commit`. If a secret is found, the commit is aborted.
```bash
npx zeroguard-cli init
```

### 2. Generate CI/CD Pipeline (`ci`)
Instantly generates a free, fully configured GitHub Actions workflow (`.github/workflows/zeroguard.yml`) that acts as a cloud safety net on every push and pull request.
```bash
npx zeroguard-cli ci
```

### 3. Manual Security Scan (`scan`)
Manually scans your entire project directory for vulnerabilities.
```bash
npx zeroguard-cli scan
```

## ✨ Features
- 🔑 **Secrets Scanner:** Detects AWS Access Keys, Stripe Secrets, and generic API keys.
- 🛡️ **Gitignore Validator:** Prevents you from committing `.env` files if they are not listed in `.gitignore`.
- 🐳 **Docker Auditor:** Blocks `latest` image tags and enforces non-root container users.
- ⚡ **Zero Config:** No complex `.yml` or `.json` setup required. 

## 🏗️ Project Architecture
```text
zeroguard-cli/
├── src/
│   ├── commands/      # CLI terminal commands (init, scan, ci)
│   ├── scanners/      # Security logic (secrets, docker, gitignore)
│   ├── utils/         # Helpers (logger, terminal styling)
│   └── index.ts       # CLI entry point
├── dist/              # Compiled executable files
└── package.json
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📄 License
This project is [MIT](https://opensource.org/licenses/MIT) licensed.