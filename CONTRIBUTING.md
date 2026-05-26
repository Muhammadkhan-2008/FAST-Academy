# Contributing to FAST Institute

Thank you for your interest in contributing to FAST Institute! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful and inclusive. Harassment, discrimination, and offensive behavior will not be tolerated.

## Getting Started

### Prerequisites
- Node.js 18+
- Git
- GitHub account

### Setting Up Your Development Environment

1. **Fork the repository**
   - Click the "Fork" button on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/FAST-Academy.git
   cd FAST-Academy
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/Muhammadkhan-2008/FAST-Academy.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   cd server && npm install && cd ..
   ```

5. **Create environment files**
   ```bash
   cp .env.example .env.local
   cp server/.env.example server/.env
   ```

6. **Start development servers**
   ```bash
   # Terminal 1
   npm run dev
   
   # Terminal 2
   cd server && npm run dev
   ```

## Development Workflow

### Creating a Feature Branch

1. **Sync with upstream**
   ```bash
   git fetch upstream
   git reset --hard upstream/main
   ```

2. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

   Branch naming conventions:
   - `feature/feature-name` - New features
   - `fix/bug-name` - Bug fixes
   - `docs/documentation` - Documentation updates
   - `refactor/component-name` - Code refactoring
   - `test/test-name` - Test additions

### Making Changes

- Follow the existing code style
- Write clear, descriptive commit messages
- Keep commits atomic and focused
- Add tests for new features
- Update documentation as needed

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning (whitespace, etc)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to build process, dependencies, etc

**Examples:**
```
feat: add AI-powered search overlay

Implement intelligent search functionality with natural language processing
and context-aware results across courses and resources.

Closes #123
```

```
fix: resolve authentication token expiration issue

Token refresh now triggers automatically when access token expires,
preventing user session interruption.

Fixes #456
```

## Pull Request Process

1. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**
   - Go to GitHub and click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR title and description
   - Reference any related issues (#123)

3. **PR Title Format**
   ```
   [TYPE] Brief description
   ```
   - `[FEATURE]` - New features
   - `[FIX]` - Bug fixes
   - `[DOCS]` - Documentation
   - `[REFACTOR]` - Code refactoring
   - `[PERF]` - Performance improvements

4. **PR Description Template**
   ```markdown
   ## Description
   Brief description of what this PR does

   ## Changes
   - Change 1
   - Change 2

   ## Testing
   How to test these changes

   ## Related Issues
   Closes #123
   ```

5. **Review Process**
   - Automated tests must pass
   - Code review by maintainers
   - Make requested changes
   - Rebase if needed

6. **Merging**
   - Maintainers will merge when approved
   - Your branch will be deleted automatically

## Code Style Guide

### Frontend (React)

```javascript
// Use functional components with hooks
const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);
  
  const handleClick = () => {
    setState(newValue);
  };
  
  return (
    <div className="container">
      <h1>{prop1}</h1>
    </div>
  );
};

export default MyComponent;
```

- Use camelCase for variables and functions
- Use PascalCase for components
- Use descriptive names
- Add JSDoc comments for complex functions
- Keep components focused and reusable

### Backend (Node.js)

```javascript
// Use async/await
const getUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    logger.error('Error fetching user:', error);
    throw new AppError('User not found', 404);
  }
};
```

- Use const by default, let when needed
- Avoid var
- Use meaningful variable names
- Add error handling
- Use middleware for common tasks

## Testing

### Frontend
```bash
npm test
```

### Backend
```bash
cd server && npm test
```

- Write tests for new features
- Maintain >80% code coverage
- Use descriptive test names

## Documentation

- Update README if adding new features
- Add JSDoc comments to functions
- Document API endpoints
- Include examples in code comments
- Update CHANGELOG for version releases

## Reporting Bugs

### Bug Report Template
```markdown
## Description
Brief description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
If applicable

## Environment
- Browser: Chrome 120
- OS: Windows 11
- Node version: 18.0.0
```

## Requesting Features

### Feature Request Template
```markdown
## Description
What feature would you like?

## Use Case
Why do you need this feature?

## Proposed Solution
How should it work?

## Alternatives
Other possible solutions

## Additional Context
Any other information
```

## Getting Help

- **Discussions**: Use GitHub Discussions for questions
- **Issues**: Use Issues for bugs and feature requests
- **Documentation**: Check README and docs folder
- **Community**: Join our Discord/Slack community

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes
- Project website

## Licensing

By contributing to FAST Institute, you agree that your contributions will be licensed under the ISC License.

## Questions?

Feel free to open an issue or contact the maintainers:
- Email: support@fastinstitute.com
- GitHub: @Muhammadkhan-2008

---

**Happy Contributing! 🎉**
