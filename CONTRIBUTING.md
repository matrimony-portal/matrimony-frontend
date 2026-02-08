# Contributing Guide

## Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Branch Naming](#branch-naming)
- [Code Quality](#code-quality)
- [Commit Messages](#commit-messages)
- [Pull Requests](#pull-requests)

## Quick Start

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Make your changes
5. Fix code issues: `npm run fix`
6. Commit changes: `npm run commit`
7. Push and create a pull request

## Project Structure

```
src/
├── components/     # React components
├── hooks/         # Custom hooks
├── services/      # API services
├── providers/     # Context providers
├── utils/         # Utilities
└── assets/        # Images, fonts
```

## Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation
- `refactor/description` - Code refactoring

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

## API Response Structure

**All API responses follow this standardized structure:**

```javascript
// Success Response
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation successful",
  "timestamp": "2025-01-15T10:30:00"
}

// Error Response
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Invalid input",
    "details": "Email format is incorrect",
    "field": "email"
  },
  "timestamp": "2025-01-15T10:30:00"
}
```

**Usage in Services:**

```javascript
import apiClient from "@/utils/apiClient";

// Example: Handling API response
const getUser = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}`);

    if (response.isSuccess()) {
      return response.getData(); // Extract data
    }

    throw new Error(response.getErrorMessage());
  } catch (error) {
    console.error(error.getErrorMessage());
    throw error;
  }
};
```

**Helper Methods:**

- `response.isSuccess()` - Check if request succeeded
- `response.isError()` - Check if request failed
- `response.getData()` - Extract response data
- `response.getMessage()` - Get success message
- `response.getError()` - Get error object
- `response.getErrorMessage()` - Get error message

**Common Error Codes:**

- `VALIDATION_FAILED` - Input validation failed
- `NOT_FOUND` - Resource not found
- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - Access denied
- `CONFLICT` - Resource conflict
- `SERVER_ERROR` - Internal server error
- `NETWORK_ERROR` - Network/connection error
- `TIMEOUT` - Request timeout

## Commit Messages

Use conventional commits:

```bash
npm run commit
```

Examples:

- `feat: add user registration`
- `fix: resolve login validation`
- `docs: update README`

## Pull Requests

**Branch Flow:**

1. Create PR: `feature/branch` → `dev`
2. Merge: `dev` → `main` (when ready for production)

**Target for new features:** Always create PRs to `dev`

**Before creating PR:**

1. Update dev branch: `git checkout dev && git pull origin dev`
2. Rebase feature branch: `git checkout feature/your-feature && git rebase dev`
3. Run `npm run fix && npm run check`
4. Test with `npm run dev`
5. Ensure `npm run build` works
6. Keep PRs < 400 lines
7. Get at least 1 approval

**Merge Style:**

- Use **Rebase and Merge** for feature PRs
- Maintains linear commit history
- Preserves individual commits from feature branch
