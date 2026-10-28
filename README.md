# 🛡️ ZeroGuard CLI

[![npm version](https://img.shields.io/npm/v/zeroguard-cli.svg)](https://www.npmjs.com/package/zeroguard-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Zero-config DevSecOps & QA CLI for indie hackers and solo devs.**

ZeroGuard prevents you from accidentally leaking AWS keys, Stripe secrets, and deploying vulnerable Docker images. It injects a pre-commit hook that automatically scans your code before every commit, securing your project locally and in the cloud with zero configuration.

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
Sets up a Git pre-commit hook in your repository. Once installed, ZeroGuard will automatically scan your files every time you run `git commit`. If a secret or vulnerability is found, the commit is aborted.
```bash
npx zeroguard-cli init
```

### 2. Manual Security Scan (`scan`)
Scans your entire project directory for hardcoded secrets, API keys, and Dockerfile vulnerabilities.
```bash
npx zeroguard-cli scan
```

### 3. Generate CI/CD Pipeline (`ci`)
Instantly generates a free, fully configured GitHub Actions workflow (`.github/workflows/zeroguard.yml`).
```bash
npx zeroguard-cli ci
```

## ✨ Features
- 🔑 **Secrets Scanner:** Detects AWS Access Keys, Stripe Secrets, and generic API keys.
- 🐳 **Docker Auditor:** Blocks `latest` image tags and enforces non-root container users.
- ⚡ **Zero Config:** No complex `.yml` or `.json` setup required. Run one command and you are secure.
- 🤖 **Automated CI/CD:** Generates GitHub Actions pipelines instantly.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📄 License
This project is [MIT](https://opensource.org/licenses/MIT) licensed.