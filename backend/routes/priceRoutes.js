import express from 'express';
import { getPriceHistory, getStockDetails, getSymbols, searchSymbols } from '../controllers/priceController.js';

const priceRouter = express.Router();

alertRouter.use(protect);

priceRouter.get('/', getSymbols);
priceRouter.get('/search', searchSymbols);
priceRouter.get('/history', getPriceHistory);
priceRouter.get('/:symbol', getStockDetails);

export default priceRouter;