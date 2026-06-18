import { Router, Request, Response } from 'express';
import { VitalSigns } from '../../shared/types/index';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const vitals: Map<string, VitalSigns> = new Map();

// GET vital signs for admission
router.get('/admission/:admissionId', async (req: Request, res: Response) => {
  try {
    const results = Array.from(vitals.values()).filter(
      v => v.admissionId === req.params.admissionId
    );
    res.json({ success: true, data: results });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'FETCH_ERROR', message: error.message },
    });
  }
});

// CREATE vital signs
router.post('/', async (req: Request, res: Response) => {
  try {
    const vital: VitalSigns = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      ...req.body,
    };

    vitals.set(vital.id, vital);
    res.status(201).json({ success: true, data: vital });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'CREATE_ERROR', message: error.message },
    });
  }
});

export default router;
