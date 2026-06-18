# Development Setup Guide

## Prerequisites

- Node.js 18.x LTS
- npm 9.x or yarn 3.x
- PostgreSQL 13+
- Redis 6+
- Git
- VS Code (recommended)

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/gbmsbsc99-cpu/Madhu.git
cd Madhu
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install workspace dependencies (web, mobile, backend, shared)
npm install --workspaces
```

### 3. Environment Setup

```bash
# Copy environment templates
cp backend/.env.example backend/.env
cp web/.env.example web/.env
cp mobile/.env.example mobile/.env
```

### 4. Start Services

```bash
# Start Docker services
docker-compose up -d

# Run database migrations
npm run migrate

# Start development servers
npm run dev
```

This will start:
- **Web app**: http://localhost:3000
- **API**: http://localhost:5000
- **Mobile**: Metro bundler on port 8081
- **pgAdmin**: http://localhost:5050

## VS Code Setup

### Recommended Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "GraphQL.vscode-graphql",
    "ms-azuretools.vscode-docker",
    "GitHub.copilot"
  ]
}
```

### Settings

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Project Structure

```
Madhu/
├── shared/              # Shared types, services, utilities
├── web/                 # React web application
├── mobile/              # React Native mobile app
├── backend/             # Express.js API server
├── ai-models/           # ML models and training
├── docs/                # Documentation
├── docker-compose.yml   # Local development setup
└── package.json         # Root package configuration
```

## Development Workflow

### Feature Development

1. Create feature branch
   ```bash
   git checkout -b feature/patient-management
   ```

2. Make changes in appropriate workspace
   ```bash
   # Edit shared types
   # Edit backend routes
   # Edit web/mobile components
   ```

3. Test changes
   ```bash
   npm run test
   npm run test:web
   npm run test:backend
   ```

4. Commit with conventional commits
   ```bash
   git commit -m "feat: Add patient management UI"
   ```

5. Push and create PR
   ```bash
   git push origin feature/patient-management
   ```

### Debugging

#### Backend

```bash
# Run with debugger
node --inspect=9229 backend/src/server.ts

# In Chrome: chrome://inspect
```

#### Web

```bash
# React DevTools extension
# Redux DevTools extension
```

#### Mobile

```bash
# React Native Debugger
rn-debugger

# Or use Expo DevTools
```

## Testing

### Unit Tests

```bash
npm run test
```

### Integration Tests

```bash
npm run test:integration
```

### E2E Tests

```bash
npm run test:e2e
```

## Code Quality

### Linting

```bash
npm run lint
npm run lint:fix
```

### Type Checking

```bash
npm run type-check
```

### Format Code

```bash
npm run format
```

## Database Operations

### Create Migration

```bash
npm run migrate:create -- --name add_patient_table
```

### Run Migrations

```bash
npm run migrate:up
```

### Rollback

```bash
npm run migrate:down
```

### Seed Data

```bash
npm run seed
```

## Common Issues

### Port Already in Use

```bash
# Find process using port
lsof -i :5000

# Kill process
kill -9 <PID>
```

### Database Connection Failed

```bash
# Check PostgreSQL is running
docker ps | grep postgres

# Check connection string in .env
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules
npm install

# Clear cache
npm cache clean --force
```

## Performance Testing

### Load Testing

```bash
# Using Apache Bench
ab -n 1000 -c 10 http://localhost:5000/health

# Using wrk
wrk -t4 -c100 -d30s http://localhost:5000/health
```

### Profiling

```bash
# CPU profiling
node --prof backend/src/server.ts
node --prof-process isolate-*.log > profile.txt
```

## Resources

- [React Documentation](https://react.dev)
- [React Native Documentation](https://reactnative.dev)
- [Express.js Guide](https://expressjs.com)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [Redux Documentation](https://redux.js.org)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
