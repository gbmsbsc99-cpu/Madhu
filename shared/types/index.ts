// Patient Types
export interface Patient {
  id: string;
  mrn: string; // Medical Record Number
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'M' | 'F' | 'Other';
  bloodType: string;
  email: string;
  phone: string;
  address: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  allergies: string[];
  medications: Medication[];
  medicalHistory: MedicalHistory[];
  admissions: Admission[];
  createdAt: string;
  updatedAt: string;
}

export interface MedicalHistory {
  id: string;
  patientId: string;
  condition: string;
  startDate: string;
  endDate?: string;
  notes: string;
  icd10Code: string;
}

export interface Medication {
  id: string;
  patientId: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
  reason: string;
  status: 'active' | 'inactive' | 'completed';
}

// Admission Types
export interface Admission {
  id: string;
  patientId: string;
  admissionDate: string;
  dischargeDate?: string;
  bedNumber: string;
  department: string;
  doctor: string;
  reason: string;
  status: 'admitted' | 'discharged' | 'transferred';
  notes: string;
  vitals: VitalSigns[];
}

export interface VitalSigns {
  id: string;
  admissionId: string;
  timestamp: string;
  temperature: number;
  heartRate: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  respiratoryRate: number;
  oxygenSaturation: number;
  bloodGlucose?: number;
  notes?: string;
  recordedBy: string;
}

// Lab Test Types
export interface LabTest {
  id: string;
  patientId: string;
  admissionId: string;
  testName: string;
  testCode: string;
  orderedDate: string;
  completedDate?: string;
  orderedBy: string;
  status: 'ordered' | 'in-progress' | 'completed' | 'cancelled';
  results: LabResult[];
  notes: string;
}

export interface LabResult {
  id: string;
  testId: string;
  parameterName: string;
  value: number | string;
  unit: string;
  referenceRange: string;
  abnormal: boolean;
  notes?: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  department: string;
  licenseNumber?: string;
  specialization?: string;
  status: 'active' | 'inactive';
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'admin' | 'doctor' | 'nurse' | 'lab_technician' | 'pharmacist' | 'receptionist' | 'billing_officer';

// Appointment Types
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  scheduledDate: string;
  duration: number; // in minutes
  type: 'consultation' | 'follow-up' | 'procedure';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes: string;
  createdAt: string;
  updatedAt: string;
}

// Bed Management
export interface Bed {
  id: string;
  bedNumber: string;
  floor: number;
  department: string;
  type: 'general' | 'icu' | 'isolation';
  status: 'available' | 'occupied' | 'maintenance';
  currentPatientId?: string;
  admittedDate?: string;
  notes?: string;
}

// Billing Types
export interface Bill {
  id: string;
  patientId: string;
  admissionId: string;
  billDate: string;
  dueDate: string;
  items: BillItem[];
  totalAmount: number;
  paidAmount: number;
  status: 'draft' | 'issued' | 'partial' | 'paid' | 'cancelled';
  notes?: string;
}

export interface BillItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: 'consultation' | 'procedure' | 'medication' | 'lab' | 'bed' | 'other';
}

// AI/ML Types
export interface HealthPrediction {
  id: string;
  patientId: string;
  predictionType: 'readmission' | 'complication' | 'mortality' | 'length_of_stay';
  riskScore: number; // 0-100
  riskLevel: 'low' | 'medium' | 'high';
  factors: string[];
  confidence: number;
  modelVersion: string;
  generatedAt: string;
}

export interface DrugInteraction {
  id: string;
  drug1: string;
  drug2: string;
  severity: 'mild' | 'moderate' | 'severe';
  description: string;
  recommendation: string;
  evidence: string;
}

// Sync Types (Offline-First)
export interface SyncQueue {
  id: string;
  entityType: string;
  entityId: string;
  action: 'create' | 'update' | 'delete';
  payload: any;
  timestamp: string;
  synced: boolean;
  syncedAt?: string;
  retries: number;
}

export interface SyncConflict {
  id: string;
  queueId: string;
  localVersion: any;
  serverVersion: any;
  resolvedAt?: string;
  resolution: 'local' | 'server' | 'manual';
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'alert' | 'message' | 'appointment' | 'lab_result' | 'vital_sign';
  title: string;
  message: string;
  entityType?: string;
  entityId?: string;
  read: boolean;
  createdAt: string;
  readAt?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}
