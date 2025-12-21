# Matrimony Frontend

A modern React-based matrimony application with comprehensive tooling for development and code quality.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Fix all code issues
npm run fix
```

## Project Structure

```
src/
├── components/          # React components (Login, Register, etc.)
├── hooks/              # Custom hooks (useAuth, useLocalStorage)
├── services/           # API services and mock data
├── providers/          # Context providers (AuthProvider)
├── utils/              # Utility functions
└── assets/             # Images, fonts, icons
```

## Development Scripts

**Main Commands:**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run fix` - Auto-fix all code issues
- `npm run check` - Validate code without fixing
- `npm run commit` - Create conventional commits

**Individual Tools:**

- `npm run format` - Prettier formatting
- `npm run lint:css` - CSS linting with Stylelint
- `npm run lint:js` - JavaScript linting with ESLint

## Features

- React 19 with modern hooks
- Step-based user registration
- Authentication with context
- Bootstrap styling with custom CSS variables
- Automated code quality checks
- Conventional commit enforcement

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

**Quick workflow:**

1. Fork and clone
2. Create feature branch
3. Make changes
4. Run `npm run fix`
5. Commit with `npm run commit`
6. Submit pull request

## Tech Stack

- **Frontend**: React 19, React Router
- **Styling**: Bootstrap 5, Custom CSS
- **Build**: Vite
- **Quality**: ESLint, Stylelint, Prettier
- **Git**: Husky, Commitlint, Conventional Commits
