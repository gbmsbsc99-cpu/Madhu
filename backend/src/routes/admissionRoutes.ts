import { Router, Request, Response } from 'express';
import { Admission } from '../../shared/types/index';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const admissions: Map<string, Admission> = new Map();

// GET all admissions
router.get('/', async (req: Request, res: Response) => {
  try {
    const status = (req.query.status as string) || '';
    let results = Array.from(admissions.values());

    if (status) {
      results = results.filter(a => a.status === status);
    }

    res.json({ success: true, data: results });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'FETCH_ERROR', message: error.message },
    });
  }
});

// GET admission by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const admission = admissions.get(req.params.id);
    if (!admission) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Admission not found' },
      });
    }
    res.json({ success: true, data: admission });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'FETCH_ERROR', message: error.message },
    });
  }
});

// CREATE admission
router.post('/', async (req: Request, res: Response) => {
  try {
    const admission: Admission = {
      id: uuidv4(),
      vitals: [],
      ...req.body,
    };

    admissions.set(admission.id, admission);
    res.status(201).json({ success: true, data: admission });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'CREATE_ERROR', message: error.message },
    });
  }
});

// UPDATE admission
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const admission = admissions.get(req.params.id);
    if (!admission) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Admission not found' },
      });
    }

    const updated = { ...admission, ...req.body, id: admission.id };
    admissions.set(req.params.id, updated);
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'UPDATE_ERROR', message: error.message },
    });
  }
});

export default router;
