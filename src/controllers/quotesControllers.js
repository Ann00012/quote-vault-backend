import { Quote } from "../models/quote.js";
import createHttpError from 'http-errors'

export const getQuotes = async (req, res) => {
  const { page = 1, perPage = 10, category,author,search,sortBy = "_id",
    sortOrder = "asc" } = req.query;
  const skip = (page - 1) * perPage;
  const quoteQuery = Quote.find();
    if (category) {
quoteQuery.where("category").equals(category)
    }
  if (author) {
    quoteQuery.where("author").equals(author)
  }
    if (search) {
    quoteQuery.where({
	  text: { $regex: search, $options: "i" },
	});
  }
  const [totalItems, quotes] = await Promise.all(
    [
    quoteQuery.clone().countDocuments(),
    quoteQuery.skip(skip).limit(perPage).sort({ [sortBy]: sortOrder }),
  ]
  );
  const totalPages = Math.ceil(totalItems / perPage);
  res.status(200).json({
    page,
    perPage,
    totalItems,
    totalPages,
    quotes
  });
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

