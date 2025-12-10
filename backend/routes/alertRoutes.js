import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { createAlert, deleteAlert, getAlerts, updateAlert } from '../controllers/alertController.js';

const alertRouter = express.Router();

alertRouter.use(protect);

alertRouter.post('/', createAlert);
alertRouter.get('/', getAlerts);

alertRouter.put('/:id', updateAlert);

alertRouter.delete('/:id', deleteAlert);

export default alertRouter;