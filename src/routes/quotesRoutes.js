import { Router } from 'express';
import { Quote } from '../models/quote.js';
import { getQuoteById, getQuotes, createQuote, deleteQuote, updateQuote ,getRandomQuote} from '../controllers/quotesControllers.js';
import { createQuoteSchema,quoteIdParamSchema ,updateQuoteSchema,getQuotesSchema} from '../validations/quotesValidations.js';
import { celebrate, Segments } from 'celebrate';
import { authenticate } from "../middleware/authenticate.js";

const routerQuotes = Router();

routerQuotes.get("/quotes",celebrate(getQuotesSchema), getQuotes);
routerQuotes.get("/quotes/random", getRandomQuote);
routerQuotes.get("/quotes/:quoteId",celebrate(quoteIdParamSchema), getQuoteById);

routerQuotes.post("/quote", authenticate,celebrate(createQuoteSchema),createQuote,);
routerQuotes.delete("/quotes/:quoteId", authenticate,celebrate(quoteIdParamSchema),deleteQuote);
routerQuotes.patch("/quotes/:quoteId",authenticate,celebrate(updateQuoteSchema), updateQuote);
export default routerQuotes;
