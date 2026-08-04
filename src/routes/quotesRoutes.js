import { Router } from 'express';
import { Quote } from '../models/quote.js';
import { getQuoteById,getQuotes,createQuote,deleteQuote,updateQuote } from '../controllers/quotesControllers.js';
const routerQuotes = Router();

routerQuotes.get("/quotes", getQuotes);

routerQuotes.get("/quotes/:quoteId", getQuoteById);

routerQuotes.post("/quote", createQuote);
routerQuotes.delete("/quotes/:quoteId", deleteQuote);
routerQuotes.patch("/quotes/:quoteId", updateQuote);
export default routerQuotes;
