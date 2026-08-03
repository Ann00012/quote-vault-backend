import { Quote } from "../models/quote.js";
import createHttpError from 'http-errors'

export const getQuotes = async (req, res) => {
  const quotes = await Quote.find();
  res.status(200).json(quotes);
};

export const getQuoteById = async (req, res) => {
  const { quoteId } = req.params;
  const quote = await Quote.findById(quoteId);
  if (!quote) {
    throw createHttpError(404,"Quote not found");
  };
  res.status(200).json(quote)
};

