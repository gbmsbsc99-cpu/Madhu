# Deployment Guide

## Prerequisites

- Node.js 18+
- PostgreSQL 13+
- Docker & Docker Compose (optional)
- AWS Account (for cloud deployment)

## Local Development

### 1. Setup Environment Variables

```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp web/.env.example web/.env

# Mobile
cp mobile/.env.example mobile/.env
```

### 2. Start Services

```bash
# Start Docker services (DB, Redis, etc.)
docker-compose up -d

# Install dependencies
npm install

# Run migrations
npm run migrate

# Start development servers
npm run dev
```

## Docker Deployment

### Build Images

```bash
# Build all images
docker-compose build

# Or individual images
docker build -t health-api:latest ./backend
docker build -t health-web:latest ./web
```

### Run with Docker Compose

```bash
# Production configuration
docker-compose -f docker-compose.prod.yml up -d
```

## AWS Deployment

### Option 1: ECS with Fargate

```bash
# Create ECR repository
aws ecr create-repository --repository-name health-api

# Build and push
docker tag health-api:latest <account>.dkr.ecr.<region>.amazonaws.com/health-api:latest
docker push <account>.dkr.ecr.<region>.amazonaws.com/health-api:latest

# Deploy to ECS (use CloudFormation template)
aws cloudformation create-stack \
  --stack-name health-system \
  --template-body file://cloudformation.yml
```

### Option 2: Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init -p "Node.js 18 running on 64bit Amazon Linux 2" health-api

# Create environment and deploy
eb create health-api-prod
eb deploy
```

## Database Migration

### PostgreSQL Setup

```bash
# Create database
psql -U postgres -c "CREATE DATABASE hospital_db;"

# Run migrations
npm run migrate:up

# Seed initial data (optional)
npm run seed

# Verify
psql -U health_admin -d hospital_db -c "\dt"
```

## Web Deployment

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd web
vercel
```

### Netlify

```bash
netlify deploy --prod --dir=web/build
```

### AWS S3 + CloudFront

```bash
# Build
cd web
npm run build

# Sync to S3
aws s3 sync build/ s3://health-system-web/

# Invalidate CloudFront
aws cloudfront create-invalidation \
  --distribution-id <distribution-id> \
  --paths "/*"
```

## Mobile Deployment

### iOS (App Store)

```bash
# Prepare for submission
eas build --platform ios

# Submit to App Store
eas submit --platform ios
```

### Android (Google Play)

```bash
# Build APK
eas build --platform android

# Upload to Google Play
eas submit --platform android
```

## SSL/TLS Certificate

### Using Let's Encrypt

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot certonly --standalone -d api.hospital.local

# Renew automatically
sudo systemctl enable certbot.timer
```

## Environment Configuration

### Production `.env`

```bash
# Server
NODE_ENV=production
PORT=5000

# Database
DATABASE_URL=postgresql://user:pass@rds.amazonaws.com/hospital_db
DATABASE_POOL_SIZE=20
DATABASE_TIMEOUT=5000

# Redis
REDIS_URL=redis://redis.amazonaws.com:6379
REDIS_PASSWORD=secure_password

# Security
JWT_SECRET=very_long_random_string_min_32_chars
BCRYPT_ROUNDS=12

# API
API_URL=https://api.hospital.local
WEB_URL=https://hospital.local
MOBILE_URL=hospital://

# AWS
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...

# Monitoring
SENTRY_DSN=https://...
DAYDOG_API_KEY=...

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@hospital.local
SMTP_PASSWORD=...
```

## Health Checks

```bash
# API health
curl http://localhost:5000/health

# Database
psql -U health_admin -d hospital_db -c "SELECT 1"

# Redis
redis-cli ping
```

## Monitoring & Logging

### CloudWatch

```bash
# View logs
aws logs tail /aws/ecs/health-api --follow

# Create alarms
aws cloudwatch put-metric-alarm \
  --alarm-name api-error-rate \
  --alarm-actions arn:aws:sns:...
```

### Application Performance Monitoring

```typescript
// Add Sentry for error tracking
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

## Backup & Disaster Recovery

### Database Backup

```bash
# Manual backup
pg_dump hospital_db > backup_$(date +%Y%m%d).sql

# Automated (AWS RDS)
aws rds create-db-snapshot \
  --db-instance-identifier hospital-db \
  --db-snapshot-identifier backup-$(date +%Y%m%d)

# Restore from backup
pg_restore -d hospital_db backup_20260618.sql
```

### Restore Procedure

1. Backup current database
2. Stop application
3. Restore from snapshot
4. Verify data integrity
5. Run migrations
6. Restart application

## Performance Optimization

### Database
- Enable query logging
- Add indexes
- Use connection pooling
- Archive old records

### API
- Enable gzip compression
- Cache responses
- Implement rate limiting
- Use CDN for static assets

### Frontend
- Code splitting
- Lazy loading
- Image optimization
- Service worker

## Scaling Considerations

- Horizontal scaling with load balancer
- Database read replicas
- Redis clustering
- Content delivery network (CDN)
- Microservices architecture (future)

## Maintenance Tasks

### Weekly
- Monitor error rates
- Check database size
- Review logs for issues

### Monthly
- Database maintenance
- Security patches
- Performance analysis
- Backup verification

### Quarterly
- Disaster recovery drill
- Security audit
- Capacity planning
- Architecture review
