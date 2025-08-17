import mongoose, { mongo, startSession } from "mongoose";

// Step 1 - create a schema
// Step 2 - model based on that schema

// Schema
const noteSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true,
    }
    }, 
    {timestamps: true}  // createdAt, updatedAt
)


const Note = mongoose.model("Note", noteSchema);

export default Note