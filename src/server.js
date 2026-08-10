import express from 'express';
import cors from 'cors';
import { errors } from "celebrate";
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { Quote } from './models/quote.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import routerQuotes from './routes/quotesRoutes.js';
import authRouter from './routes/authRoutes.js';
import cookieParser from "cookie-parser";
import routerUser from './routes/userRoutes.js';

const app = express();
// const PORT = process.env.PORT ?? 3000;
const PORT = 3000;

app.use(logger);
app.use(express.json({
  type: ['application/json', 'application/vnd.api+json'],
}));
app.use(cors());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});

app.use(authRouter);
app.use(routerQuotes);
app.use(routerUser);
app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

