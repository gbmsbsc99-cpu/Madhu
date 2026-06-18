import { Router, Request, Response } from 'express';
import { Appointment } from '../../shared/types/index';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const appointments: Map<string, Appointment> = new Map();

// GET appointments
router.get('/', async (req: Request, res: Response) => {
  try {
    const patientId = (req.query.patientId as string) || '';
    let results = Array.from(appointments.values());

    if (patientId) {
      results = results.filter(a => a.patientId === patientId);
    }

    res.json({ success: true, data: results });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'FETCH_ERROR', message: error.message },
    });
  }
});

// CREATE appointment
router.post('/', async (req: Request, res: Response) => {
  try {
    const appointment: Appointment = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...req.body,
    };

    appointments.set(appointment.id, appointment);
    res.status(201).json({ success: true, data: appointment });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'CREATE_ERROR', message: error.message },
    });
  }
});

export default router;
