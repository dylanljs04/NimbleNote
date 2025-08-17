import express from 'express'
import { getAllNotes, createNote, deleteNote, updateNote, getNoteById } from '../controllers/notesController.js'


const router = express.Router();

// Get endppint
router.get("/", getAllNotes);
router.get("/:id", getNoteById);

// Post endppint
router.post("/", createNote);

// Update endppint
router.put("/:id", updateNote);

// Delete Endpoint
router.delete("/:id", deleteNote);

export default router;