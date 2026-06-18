# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All requests (except `/auth/*`) require JWT token:

```
Authorization: Bearer <token>
```

## Response Format

```json
{
  "success": true,
  "data": { /* response data */ },
  "error": null,
  "timestamp": "2026-06-18T12:00:00Z"
}
```

## Endpoints

### Authentication

#### POST /auth/login
```json
{
  "email": "doctor@hospital.local",
  "password": "password"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGc...",
    "user": {
      "id": "user-123",
      "email": "doctor@hospital.local",
      "firstName": "John",
      "lastName": "Doe",
      "role": "doctor"
    }
  }
}
```

### Patients

#### GET /patients
Query params:
- `page` (number, default: 1)
- `pageSize` (number, default: 10)
- `search` (string)

#### GET /patients/:id
#### POST /patients
#### PUT /patients/:id
#### DELETE /patients/:id

### Admissions

#### GET /admissions
#### GET /admissions/:id
#### POST /admissions
#### PUT /admissions/:id

### Vital Signs

#### GET /vital-signs/admission/:admissionId
#### POST /vital-signs

Body:
```json
{
  "admissionId": "adm-123",
  "temperature": 37.5,
  "heartRate": 78,
  "bloodPressureSystolic": 120,
  "bloodPressureDiastolic": 80,
  "respiratoryRate": 16,
  "oxygenSaturation": 98,
  "recordedBy": "user-123"
}
```

### Lab Tests

#### GET /lab-tests?patientId=patient-123
#### POST /lab-tests

### AI Predictions

#### POST /ai/predict
```json
{
  "type": "readmission",
  "patientData": { /* patient features */ }
}
```

Response:
```json
{
  "type": "readmission",
  "riskScore": 45,
  "riskLevel": "medium",
  "confidence": 0.92
}
```

### Data Sync

#### POST /sync/:entityType
Body:
```json
{
  "action": "create|update|delete",
  "payload": { /* entity data */ }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Email and password required"
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token"
  }
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "Insufficient permissions"
  }
}
```

## Rate Limiting

- 1000 requests per hour per IP
- 100 concurrent connections per user

## Pagination

Responses with multiple items include:
```json
{
  "data": [...],
  "page": 1,
  "pageSize": 10,
  "total": 234,
  "hasMore": true
}
```
