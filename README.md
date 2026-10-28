# 🛡️ ZeroGuard CLI

**Zero-config DevSecOps & QA CLI for indie hackers and solo devs.**

Stop leaking AWS keys and deploying vulnerable Docker images. ZeroGuard secures your project in one terminal command. 

## 🚀 Quick Start

Initialize pre-commit hooks and secure your code locally:
\`\`\`bash
npx zeroguard-cli init
\`\`\`

Generate a free CI/CD GitHub Actions workflow:
\`\`\`bash
npx zeroguard-cli ci
\`\`\`

Run a manual security scan:
\`\`\`bash
npx zeroguard-cli scan
\`\`\`

## ✨ Features
- 🔑 **Secrets Scanner:** Prevents pushing AWS, Stripe, and API keys to GitHub.
- 🐳 **Docker Auditor:** Blocks `latest` tags and prevents containers from running as root.
- ⚡ **Zero Config:** Automatically detects your setup and injects the right tools.