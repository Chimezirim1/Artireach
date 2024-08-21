import asyncErrors from  'express-async-errors'

import express from "express";
import cors from "cors"; // Import cors
import connectToMongodb from "./configs/database.config.js";
const app = express();
import indexMiddleware from "./middlewares/index.middleware.js";

// DATABASE => MODEL => SERVICE => CONTROLLER => ROUTE => INDEXROUTE => INDEXMIDDLEWARE => VALIDATEMIDDLEWARE => SCHEMA => ROUTE TO CALL VALIDATE AND SCHEMA => APP.JS

// Apply CORS middleware globally
app.use(cors({
    origin: ['https://localhost:5174', 'https://dulcet-boba-66ddf8.netlify.app'], // Corrected array syntax
    credentials: true,
}));

indexMiddleware(app);

app.listen(9871, () => {
    connectToMongodb();
    console.log("Application running on port 9871");
});