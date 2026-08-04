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

export const createQuote = async (req, res) => {
  const quote = await Quote.create(req.body);
  res.status(201).json(quote)
};

export const deleteQuote = async (req, res) => {
  const { quoteId } = req.params;
  const quote = await Quote.findOneAndDelete({ _id: quoteId });
  if (!quote) {
    throw createHttpError(404, "Quote not found");
  }
  res.status(200).json(quote);
};

export const updateQuote = async (req, res) => {
  const { quoteId } = req.params;
  const quote = await Quote.findOneAndUpdate({ _id: quoteId }, req.body, { returnDocument: "after" });
  if (!quote) {
    throw createHttpError(404, "Quote not found");
  }
  res.status(200).json(quote)
};

