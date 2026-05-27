import { Router } from 'express';
import { getServices, createService, updateService, deleteService } from '../controllers/service.controller';

const router = Router();

// /api/services root adresine gelen istekler
router.get('/', getServices);
router.post('/', createService);

// ID parametresi ile gelen istekler
router.put('/:id', updateService);
router.delete('/:id', deleteService);

export default router;