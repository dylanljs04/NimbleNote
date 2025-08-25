import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import dotenv from "dotenv";
import cors from 'cors';
import { connectDB } from './config/db.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import path from "path";


// Import .env variables
dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();
const __dirname = path.resolve();


// middleware (order is very important) (ONLY NEEDED IN DEVELOPMENT)
if (process.env.NOTE_ENV !== "production"){
    app.use(cors({
        origin: "http://localhost:5173", 
    }));
}
  
app.use(express.json())
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);


// We only want to do this when in production
if(process.env.NOTE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    });
}


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Running server on port 5001")
    });
})

