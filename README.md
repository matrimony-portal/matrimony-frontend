# Matrimony Frontend

A modern, responsive HTML, CSS, and JavaScript-based frontend for a matrimony application with comprehensive tooling for development and code quality.

## Project Structure

```
matrimony-frontend/
├── index.html                    # Main entry point (homepage)
├── pages/                        # Additional HTML pages
├── css/                          # Stylesheets
│   ├── styles.css                # Main CSS file
├── js/                           # JavaScript files
│   ├── script.js                 # Main JS file
├── assets/                       # Static assets (images, fonts, etc.)
│   ├── images/                   # Image files
│   ├── fonts/                    # Font files
├── components/                   # Reusable HTML components
├── utils/                        # Utility scripts or helpers
├── .gitignore                    # Git ignore rules
├── .editorconfig                 # Editor configuration
├── .gitattributes                # Git attributes
├── .prettierrc                   # Prettier configuration
├── .prettierignore               # Prettier ignore rules
├── eslint.config.mjs             # ESLint configuration
├── stylelint.config.mjs          # Stylelint configuration
├── commitlint.config.js          # Commitlint configuration
├── package.json                  # Project dependencies and scripts
├── package-lock.json             # npm lock file
├── .husky/                       # Husky hooks
│   └── pre-commit                # Pre-commit hook
└── README.md                     # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm package manager

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd matrimony-frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Open `index.html` in your browser to view the site.

## Development Scripts

- `npm run lint` - Run ESLint on JavaScript files
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run lint:css` - Run Stylelint on CSS files with auto-fix
- `npm run format` - Format code with Prettier
- `npm run commit` - Create conventional commits using Commitizen

## Code Quality Tools

This project uses the following tools to maintain code quality:

- **ESLint**: JavaScript linting and code quality
- **Stylelint**: CSS linting and formatting
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **lint-staged**: Run linters on staged files
- **Commitlint**: Enforce conventional commit messages
- **GitHub Actions**: Continuous integration for automated testing and building

## Features

- Responsive design
- Basic interactivity with JavaScript
- Modular structure for easy maintenance
- Automated code quality checks
- Conventional commit enforcement

## Contributing

Please see our [Contributing Guide](CONTRIBUTING.md) for detailed information on how to contribute to this project.

For a quick start:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run code quality checks:
   ```
   npm run lint
   npm run lint:css
   npm run format
   ```
5. Test thoroughly
6. Use `npm run commit` for conventional commits
7. Submit a pull request

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.

## License

This project is licensed under the MIT License.
