# Contributing Guide

## Code Quality Scripts

**Quick Fix (Local Development):**
```bash
npm run fix
```

**Validate Only (CI/Testing):**
```bash
npm run check
```

**Individual Scripts:**
- `npm run format` - Format code with Prettier
- `npm run lint:css` - Fix CSS issues with Stylelint
- `npm run lint:js` - Fix JavaScript issues with ESLint

## Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run fix` to auto-fix all issues
5. Test thoroughly
6. Use `npm run commit` for conventional commits
7. Submit a pull request