# Healthcare System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Healthcare Platform                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            Web App (React)    Mobile App (RN)       │  │
│  │            • Dashboard        • Dashboard           │  │
│  │            • Patient Mgmt     • Patient List        │  │
│  │            • Vital Signs      • Vital Monitoring    │  │
│  │            • Lab Results      • Labs               │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                   │
│                   ┌─────▼──────┐                            │
│                   │ Sync Layer  │ (Offline-First)          │
│                   │ • IndexedDB │                          │
│                   │ • AsyncStore│                          │
│                   └─────┬──────┘                            │
│                         │                                   │
│  ┌──────────────────────▼────────────────────────────────┐  │
│  │           Backend API (Node.js/Express)              │  │
│  │  • Authentication & Authorization                     │  │
│  │  • Patient Management                                 │  │
│  │  • Admission & Discharge                              │  │
│  │  • Vital Signs Recording                              │  │
│  │  • Lab Test Management                                │  │
│  │  • Appointment Scheduling                             │  │
│  │  • Billing System                                      │  │
│  │  • Data Sync & Conflict Resolution                    │  │
│  └──────────────────────┬────────────────────────────────┘  │
│                         │                                   │
│     ┌───────────────────┼───────────────────┐              │
│     │                   │                   │              │
│  ┌──▼──┐          ┌──────▼───┐         ┌────▼──┐           │
│  │ DB  │          │  Redis   │         │ AI/ML │           │
│  │PG   │          │  Cache   │         │Models │           │
│  └─────┘          └──────────┘         └───────┘           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: React 18 + React Native
- **State Management**: Redux Toolkit
- **Routing**: React Router (Web), React Navigation (Mobile)
- **Offline Storage**: IndexedDB (Web), AsyncStorage (Mobile)
- **Real-time**: WebSocket, Socket.io
- **HTTP Client**: Fetch API with custom middleware

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Authentication**: JWT
- **Database**: PostgreSQL
- **Cache**: Redis
- **ORM**: (Extensible)

### AI/ML
- **TensorFlow.js** (Web/Mobile inference)
- **Python** (Model training)
- **scikit-learn**, **XGBoost** (Algorithms)
- **Pandas** (Data processing)

## Offline-First Architecture

### How it Works

1. **Local Storage**
   - All data stored locally (IndexedDB/AsyncStorage)
   - User can work without internet
   - No data loss when offline

2. **Data Modification**
   - Changes queued locally
   - Marked as pending sync
   - Offline indicator shown to user

3. **Auto-Sync**
   - Background sync every 30 seconds when online
   - Retry mechanism with exponential backoff
   - Conflict resolution strategy
   - User can manually trigger sync

4. **Conflict Resolution**
   - Client vs Server version comparison
   - Timestamp-based precedence
   - User prompt for manual resolution
   - Detailed audit trail

### Sync Flow

```
User Action
    │
    ▼
[Local Update]
    │
    ├─► Queue for Sync
    │
    └─► Update Local Storage
         │
         ▼
    [Is Online?]
         │
    ┌────┴────┐
    │         │
  YES       NO
    │        │
    ▼        └─► [Wait for Network]
 [Send to Server]   │
    │               ▼
    ├─► Success: Remove from Queue
    ├─► Conflict: Resolve
    └─► Failure: Retry (max 3 times)
```

## Security Architecture

### Authentication
- JWT tokens (24-hour expiration)
- Refresh token rotation
- Secure token storage
- CORS protection

### Authorization
- Role-based access control (RBAC)
- 7 roles: Admin, Doctor, Nurse, Lab Tech, Pharmacist, Receptionist, Billing Officer
- Fine-grained permissions per endpoint
- Resource-level authorization

### Data Protection
- AES-256 encryption at rest
- TLS 1.3 in transit
- Field-level encryption for PII
- Hashing for passwords (bcryptjs)

### Compliance
- HIPAA-compliant
- Audit logging (who, what, when, where)
- Data anonymization support
- Secure data deletion

## Deployment Architecture

### Development
```bash
docker-compose up  # Local stack
```

### Production
- **Web**: Vercel, Netlify, AWS S3 + CloudFront
- **Mobile**: App Store, Google Play
- **API**: AWS ECS, Kubernetes, Heroku
- **Database**: AWS RDS PostgreSQL
- **Cache**: AWS ElastiCache Redis
- **ML**: AWS SageMaker, TensorFlow Serving

## Scalability Considerations

- **Database**: Connection pooling, read replicas
- **API**: Load balancing, horizontal scaling
- **Cache**: Redis clustering
- **Storage**: CDN for static assets
- **Monitoring**: CloudWatch, Datadog
- **Logging**: ELK Stack, Splunk

## Performance Targets

- Page load time: < 2 seconds
- API response time: < 200ms (p95)
- Offline capacity: 100+ MB
- Sync latency: < 5 seconds
- Database query time: < 100ms (p95)

## Data Flow Examples

### Patient Admission (Online)
```
Nurse fills admission form
         │
         ▼
[Client validates]
         │
         ▼
[POST /api/admissions]
         │
         ▼
[Backend creates record]
         │
         ▼
[Database stores]
         │
         ▼
[Success response]
         │
         ▼
[UI updates]
```

### Patient Admission (Offline)
```
Nurse fills admission form
         │
         ▼
[Client validates]
         │
         ▼
[Queue for sync]
         │
         ▼
[Local storage]
         │
         ▼
[UI shows pending]
         │
    [Network Available]
         │
         ▼
[Auto-sync triggered]
         │
         ▼
[POST /api/sync/admission]
         │
         ▼
[Server processes]
         │
         ▼
[Update local record with server ID]
```

## Monitoring & Alerts

- API error rates
- Database performance
- Offline sync queue size
- User session metrics
- Model prediction accuracy
- System resource usage
