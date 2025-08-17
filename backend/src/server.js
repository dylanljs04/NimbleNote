import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import dotenv from "dotenv";


// Import .env variables
dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();

// middleware
app.use(express.json())
app.use(rateLimiter);


app.use("/api/notes", notesRoutes);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Running server on port 5001")
    });
})

