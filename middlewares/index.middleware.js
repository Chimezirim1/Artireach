import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { json, urlencoded } from "express";
import { config as configDotenv } from "dotenv";
import indexRoute from "../routes/index.route.js";
import { errorHandler } from './errors.middleware.js'

export default (app) => {
  if (process.env.NODE_ENV !== "production") configDotenv();

  // Body parser middleware
  app.use(json());
  app.use(urlencoded({ extended: true }));

  // CORS middleware
  app.use(cors());

  // Security middleware
  app.use(helmet());

  // Cookie parser middleware
  app.use(cookieParser());

  // Logging middleware
  app.use(morgan("dev")); // Use "combined" for more detailed logging in production

  // Mount the index route
  app.use("/", indexRoute);

  app.use(errorHandler)
};