import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { getPriceHistory, getStockDetails, getSymbols, searchSymbols } from '../controllers/priceController.js';

const priceRouter = express.Router();

priceRouter.use(protect);

priceRouter.get('/', getSymbols);
priceRouter.get('/search', searchSymbols);
priceRouter.get('/history', getPriceHistory);
priceRouter.get('/:symbol', getStockDetails);

export default priceRouter;