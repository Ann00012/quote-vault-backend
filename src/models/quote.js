import { Schema ,model} from "mongoose";

const quoteSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Inspiration',
        'Humor',
        'Literature',
        'Life',
        'Wisdom',
        'Love',
        'Art',
        'Motivation',
        'Philosophy',
        'Science',
        'Success',
        'Friendship',
        'Movies',
        'Music'
      ]
    },
    likesCount: {
      type: Number,
      default: 0

    }
  },
    {
      timestamps: true,
      versionKey: false
    }

);

quoteSchema.index({ category: 1, author: 1 });

export const Quote = model('Quote',quoteSchema);
