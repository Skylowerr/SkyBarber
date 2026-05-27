import { Router } from 'express';
import { createAppointment, getOccupiedTimes, getMyAppointments, cancelAppointment } from '../controllers/appointment.controller';

const router = Router();

router.post('/', createAppointment);
router.get('/occupied', getOccupiedTimes);
router.get('/my-appointments', getMyAppointments); // <-- Eklendi
router.delete('/:id', cancelAppointment); // <-- Eklendi

export default router;