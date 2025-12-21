# Contributing Guide

## Quick Start

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Make your changes
5. Fix code issues: `npm run fix`
6. Commit changes: `npm run commit`
7. Push and create a pull request

## Code Quality

**Auto-fix everything:**
```bash
npm run fix
```

**Check without fixing:**
```bash
npm run check
```

**Individual tools:**
- `npm run format` - Prettier formatting
- `npm run lint:css` - CSS linting
- `npm run lint:js` - JavaScript linting

## Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom hooks
├── services/           # API services
├── providers/          # Context providers
├── utils/              # Utility functions
└── assets/             # Static assets
```

## Commit Messages

Use conventional commits:
```bash
npm run commit
```

Examples:
- `feat: add user registration`
- `fix: resolve login validation`
- `docs: update README`