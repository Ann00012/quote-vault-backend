import { Router } from 'express';
import { Quote } from '../models/quote.js';
import { getQuoteById, getQuotes, createQuote, deleteQuote, updateQuote } from '../controllers/quotesControllers.js';
import { createQuoteSchema,quoteIdParamSchema ,updateQuoteSchema,getQuotesSchema} from '../validations/quotesValidations.js';
import { celebrate, Segments } from 'celebrate';

const routerQuotes = Router();

routerQuotes.get("/quotes",celebrate(getQuotesSchema), getQuotes);

routerQuotes.get("/quotes/:quoteId",celebrate(quoteIdParamSchema), getQuoteById);

routerQuotes.post("/quote", celebrate(createQuoteSchema),createQuote);
routerQuotes.delete("/quotes/:quoteId", celebrate(quoteIdParamSchema),deleteQuote);
routerQuotes.patch("/quotes/:quoteId",celebrate(updateQuoteSchema), updateQuote);
export default routerQuotes;
