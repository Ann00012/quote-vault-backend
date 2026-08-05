import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const quoteIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    quoteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const updateQuoteSchema = {
  [Segments.PARAMS]: Joi.object({
    quoteId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    text: Joi.string().min(2).max(100),
    author: Joi.string().min(1).max(50),
    category: Joi.string().valid(    "Inspiration",
    "Humor",
    "Literature",
    "Life",
    "Wisdom",
    "Love",
    "Art",
    "Motivation",
    "Philosophy",
    "Science",
    "Success",
    "Friendship",
    "Movies",
    "Music"),
    likesCount: Joi.number().min(0),

  }).min(1),
};

export const createQuoteSchema = {
  [Segments.BODY]: Joi.object({
    text: Joi.string().min(2).max(100).required().messages({
       "string.base": "Text must be a string",
      "string.min": "Text should have at least {#limit} characters",
      "string.max": "Text should have at most {#limit} characters",
      "any.required": "text is required",
    }),
    author: Joi.string().min(1).max(50).required().messages({
       "string.base": "Author must be a string",
      "string.min": "Author should have at least {#limit} characters",
      "string.max": "Author should have at most {#limit} characters",
      "any.required": "Author is required",
    }),
category: Joi.string()
  .valid(
    "Inspiration",
    "Humor",
    "Literature",
    "Life",
    "Wisdom",
    "Love",
    "Art",
    "Motivation",
    "Philosophy",
    "Science",
    "Success",
    "Friendship",
    "Movies",
    "Music"
  )
  .required()
  .messages({
    "any.only": `Category must be one of:
Inspiration, Humor, Literature, Life, Wisdom, Love,
Art, Motivation, Philosophy, Science,
Success, Friendship, Movies, Music`,
    "any.required": "Category is required",
  }),
    likesCount: Joi.number().integer().min(0).default(0).messages({
      "number.base": "LikesCount must be a number",
      "number.min": "LikesCount must be at least {#limit}",
    }),

  })
};

export const getQuotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    category: Joi.string().valid(
    "Inspiration",
    "Humor",
    "Literature",
    "Life",
    "Wisdom",
    "Love",
    "Art",
    "Motivation",
    "Philosophy",
    "Science",
    "Success",
    "Friendship",
    "Movies",
    "Music"
    ),
    author: Joi.string().min(2).max(50),
    search: Joi.string().trim().allow(""),
    sortBy: Joi.string().valid("_id", "author","likesCount"),
    sortOrder: Joi.string().valid("asc", "desc"),
  }),
};

