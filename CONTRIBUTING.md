# Contributing to Matrimony Frontend

Thank you for your interest in contributing to the Matrimony Frontend project! We welcome contributions from the community to help improve and expand this application. Please read this guide to understand how you can contribute effectively.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

This project adheres to a code of conduct to ensure a welcoming environment for all contributors. By participating, you agree to:

- Be respectful and inclusive
- Focus on constructive feedback
- Accept responsibility for mistakes
- Show empathy towards other contributors
- Help create a positive community

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Yarn package manager
- Git

### Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/matrimony-frontend.git
   cd matrimony-frontend
   ```
3. Install dependencies:
   ```bash
   yarn install
   ```
4. Set up the development environment:
   ```bash
   yarn prepare  # Sets up Husky hooks
   ```

## Development Workflow

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes following our coding standards
3. Run code quality checks:
   ```bash
   yarn lint
   yarn lint:css
   yarn format
   ```
4. Test your changes thoroughly
5. Commit using conventional commits:
   ```bash
   yarn commit
   ```

## Submitting Changes

### Commit Messages

We use conventional commits. Follow this format:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `style:` for formatting
- `refactor:` for code restructuring
- `test:` for adding tests
- `chore:` for maintenance

Example: `feat: add user profile component`

### Pull Requests

1. Ensure your branch is up-to-date with `main`
2. Push your changes to your fork
3. Create a pull request with:
   - Clear title and description
   - Reference any related issues
   - Screenshots for UI changes
   - Test results

## Reporting Issues

When reporting bugs or requesting features:

1. Check existing issues first
2. Use issue templates when available
3. Provide detailed steps to reproduce
4. Include browser/OS information
5. Attach screenshots or error logs

## Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Ensure all tests pass
- Update documentation if needed
- Follow the existing code style
- Add tests for new functionality
- Request review from maintainers

## Testing

- Write unit tests for new functions
- Test UI changes across different browsers
- Ensure accessibility compliance
- Run the full test suite before submitting

## Documentation

- Update README.md for significant changes
- Add JSDoc comments for new functions
- Keep code comments clear and concise
- Update this CONTRIBUTING.md as needed

## Recognition

Contributors will be acknowledged in the project README and release notes. Thank you for helping make Matrimony Frontend better!

## Questions?

If you have questions about contributing, feel free to:

- Open a discussion on GitHub
- Contact the maintainers
- Check the FAQ in the README

Happy contributing! 🎉
