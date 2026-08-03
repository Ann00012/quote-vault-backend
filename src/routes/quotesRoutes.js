import { Router } from 'express';
import { Quote } from '../models/quote.js';
import { getQuoteById,getQuotes } from '../controllers/quotesControllers.js';
const routerQuotes = Router();

routerQuotes.get("/quotes", getQuotes);

routerQuotes.get("/quotes/:quoteId",getQuoteById )

export default routerQuotes;
