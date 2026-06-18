import { Router, Request, Response } from 'express';
import { Patient } from '../../shared/types/index';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Mock database (replace with real DB)
const patients: Map<string, Patient> = new Map();

// GET all patients
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const search = (req.query.search as string) || '';

    let results = Array.from(patients.values());

    // Search
    if (search) {
      results = results.filter(
        p =>
          p.firstName.toLowerCase().includes(search.toLowerCase()) ||
          p.lastName.toLowerCase().includes(search.toLowerCase()) ||
          p.mrn.includes(search)
      );
    }

    const total = results.length;
    const start = (page - 1) * pageSize;
    const paginatedResults = results.slice(start, start + pageSize);

    res.json({
      success: true,
      data: paginatedResults,
      page,
      pageSize,
      total,
      hasMore: start + pageSize < total,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'FETCH_ERROR', message: error.message },
    });
  }
});

// GET patient by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const patient = patients.get(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Patient not found' },
      });
    }

    res.json({ success: true, data: patient });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'FETCH_ERROR', message: error.message },
    });
  }
});

// CREATE patient
router.post('/', async (req: Request, res: Response) => {
  try {
    const patient: Patient = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      medications: [],
      medicalHistory: [],
      admissions: [],
      ...req.body,
    };

    patients.set(patient.id, patient);

    res.status(201).json({
      success: true,
      data: patient,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'CREATE_ERROR', message: error.message },
    });
  }
});

// UPDATE patient
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const patient = patients.get(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Patient not found' },
      });
    }

    const updated: Patient = {
      ...patient,
      ...req.body,
      id: patient.id,
      updatedAt: new Date().toISOString(),
    };

    patients.set(req.params.id, updated);

    res.json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'UPDATE_ERROR', message: error.message },
    });
  }
});

// DELETE patient
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    if (!patients.has(req.params.id)) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Patient not found' },
      });
    }

    patients.delete(req.params.id);

    res.json({
      success: true,
      message: 'Patient deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'DELETE_ERROR', message: error.message },
    });
  }
});

export default router;
