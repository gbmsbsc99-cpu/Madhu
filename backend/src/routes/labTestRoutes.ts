import { Router, Request, Response } from 'express';
import { LabTest } from '../../shared/types/index';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const labTests: Map<string, LabTest> = new Map();

// GET all lab tests
router.get('/', async (req: Request, res: Response) => {
  try {
    const patientId = (req.query.patientId as string) || '';
    let results = Array.from(labTests.values());

    if (patientId) {
      results = results.filter(t => t.patientId === patientId);
    }

    res.json({ success: true, data: results });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'FETCH_ERROR', message: error.message },
    });
  }
});

// CREATE lab test
router.post('/', async (req: Request, res: Response) => {
  try {
    const labTest: LabTest = {
      id: uuidv4(),
      orderedDate: new Date().toISOString(),
      results: [],
      ...req.body,
    };

    labTests.set(labTest.id, labTest);
    res.status(201).json({ success: true, data: labTest });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'CREATE_ERROR', message: error.message },
    });
  }
});

export default router;
