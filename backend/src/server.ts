import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Import routes
import patientRoutes from './routes/patientRoutes';
import admissionRoutes from './routes/admissionRoutes';
import vitalSignsRoutes from './routes/vitalSignsRoutes';
import labTestRoutes from './routes/labTestRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import bedRoutes from './routes/bedRoutes';
import billingRoutes from './routes/billingRoutes';
import syncRoutes from './routes/syncRoutes';
import aiRoutes from './routes/aiRoutes';

// Import middleware
import { authenticateToken } from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // CORS
app.use(morgan('combined')); // Logging
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Public routes (no auth required)
app.use('/api/auth', authRoutes);

// Protected routes (auth required)
app.use('/api/patients', authenticateToken, patientRoutes);
app.use('/api/admissions', authenticateToken, admissionRoutes);
app.use('/api/vital-signs', authenticateToken, vitalSignsRoutes);
app.use('/api/lab-tests', authenticateToken, labTestRoutes);
app.use('/api/appointments', authenticateToken, appointmentRoutes);
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/beds', authenticateToken, bedRoutes);
app.use('/api/billing', authenticateToken, billingRoutes);
app.use('/api/sync', authenticateToken, syncRoutes);
app.use('/api/ai', authenticateToken, aiRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Endpoint not found',
    },
  });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`\n🏥 Healthcare System API running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Database: ${process.env.DATABASE_URL?.split('@')[1] || 'unknown'}\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export default app;
