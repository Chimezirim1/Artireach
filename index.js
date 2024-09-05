import asyncErrors from 'express-async-errors';
import express from "express";
import cors from "cors"; // Import cors
import connectToMongodb from "./configs/database.config.js";
const app = express();
import indexMiddleware from "./middlewares/index.middleware.js";
import dotenv from "dotenv"


// Apply CORS middleware globally
app.use(cors({
    origin: '*', // Allows all origins
    credentials: false, // Must be false if using '*'
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'UPDATE'], // Ensure these methods are allowed
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    preflightContinue: false, // Instructs to pass the request to the next handler if not an OPTIONS request
    optionsSuccessStatus: 204 // Respond with 204 for successful preflight requests
}));

// Handle preflight requests globally (if needed)
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, UPDATE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(204); // Respond with 204 No Content for OPTIONS requests
});

// Apply other middleware
indexMiddleware(app);

// Start the server
app.listen(9871, () => {
    connectToMongodb();
    console.log("Application running on port 9871");
    
});


// import asyncErrors from  'express-async-errors'

// import express from "express";
// import cors from "cors"; // Import cors
// import connectToMongodb from "./configs/database.config.js";
// const app = express();
// import indexMiddleware from "./middlewares/index.middleware.js";



// // DATABASE => MODEL => SERVICE => CONTROLLER => ROUTE => INDEXROUTE => INDEXMIDDLEWARE => VALIDATEMIDDLEWARE => SCHEMA => ROUTE TO CALL VALIDATE AND SCHEMA => APP.JS

// // Apply CORS middleware globally
// app.use(cors(
//     {
//         origin: ['*', 'https://localhost:5174', 'https://dulcet-boba-66ddf8.netlify.app/'], // Corrected array syntax
//         credentials: true,
//     }
// ));

// indexMiddleware(app);

// app.listen(9871, () => {
//     connectToMongodb();
//     console.log("Application running on port 9871");
// });