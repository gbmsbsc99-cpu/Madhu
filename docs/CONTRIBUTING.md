# Contributing Guide

## Code of Conduct

Be respectful, inclusive, and professional in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork
3. Follow [Development Setup Guide](./DEVELOPMENT.md)
4. Create a feature branch
5. Make your changes
6. Submit a pull request

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body (optional)

footer (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style
- `refactor`: Code refactoring
- `test`: Tests
- `chore`: Maintenance

Example:
```
feat(patient): Add patient search functionality

Implement full-text search for patient names and MRN.
Uses PostgreSQL full-text search for performance.

Closes #123
```

## Pull Request Process

1. **Branch Naming**: `feature/description` or `fix/description`

2. **PR Title**: Follow conventional commits

3. **PR Description**:
   ```markdown
   ## Changes
   - What changed
   - Why it changed
   - How to test

   ## Testing
   - [ ] Unit tests pass
   - [ ] Integration tests pass
   - [ ] Manual testing done

   ## Checklist
   - [ ] Code follows style guide
   - [ ] Documentation updated
   - [ ] No breaking changes
   ```

4. **Reviews**: Require at least 1 approval before merge

5. **Tests**: All tests must pass

## Code Style Guide

### TypeScript

```typescript
// Use interfaces for types
interface User {
  id: string;
  email: string;
  role: UserRole;
}

// Use const for components
const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  return <div>{prop1}</div>;
};

// Use arrow functions
const myFunction = (param: string): string => {
  return param.toUpperCase();
};
```

### React/React Native

```typescript
// Use functional components
const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Effect logic
  }, [patient.id]);

  return <div>Patient: {patient.name}</div>;
};
```

### File Organization

```
components/
├── PatientCard.tsx
├── PatientCard.test.tsx
├── PatientCard.css
└── index.ts
```

## Documentation

### Code Comments

```typescript
/**
 * Fetches patient data from API
 * @param patientId - The patient ID
 * @returns Promise<Patient> - The patient data
 * @throws Error if patient not found
 */
async function getPatient(patientId: string): Promise<Patient> {
  // implementation
}
```

### README Updates

Update relevant README files when adding features:
- Main README.md
- docs/ARCHITECTURE.md
- docs/API.md

## Testing Requirements

- Minimum 80% code coverage
- All public functions must have tests
- Integration tests for API endpoints
- E2E tests for critical user flows

## Performance Guidelines

- API response time < 200ms (p95)
- Page load time < 2 seconds
- Bundle size < 500KB (gzipped)
- Mobile app size < 100MB

## Security Review

PRs affecting security require:
- Security team review
- Dependency vulnerability check
- HIPAA compliance verification

## Questions?

Open an issue or discussion:
- [Issues](https://github.com/gbmsbsc99-cpu/Madhu/issues)
- [Discussions](https://github.com/gbmsbsc99-cpu/Madhu/discussions)
