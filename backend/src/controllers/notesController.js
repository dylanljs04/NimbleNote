import Note from '../models/Note.js';

export async function getAllNotes(_,res){
    try {
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes);
    } catch(error){
        console.log("Error in getAllNotes Controller")
        res.status(500).json({message: "Internal Server Error"})
    }
};


export async function getNoteById(req,res){
    try {
        const notes = await Note.findById(req.params.id);
        res.status(200).json(notes);
    } catch(error){
        console.log("Error in getAllNotes Controller")
        res.status(500).json({message: "Internal Server Error"})
    }
};

export async function createNote(req,res){
    try{
        const {title, content} = req.body;
        const newNote = new Note({title: title, content: content});

        const savedNote = await newNote.save()
        res.status(201).json(savedNote)

    } catch(error){
        console.log("Error in createNote Controller")
        res.status(500).json({message: "Internal Server Error"})
    }
};

export async function updateNote(req,res){
    try{
        const {title, content} = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true } // returns the updated document
          );

        console.log("[UPDATED NOTE] ", updatedNote)

        if (!updatedNote){
            return res.status(404).json(updatedNote);   
        } 

        res.status(200).json(updatedNote);

    } catch(error){
        console.log("Error in updateNote Controller", error)
        res.status(500).json({message: "Internal Server Error"})
    }


};

export async function deleteNote(req,res){
    try{
        const {title, content} = req.body;
        const deleteNote = await Note.findByIdAndDelete(req.params.id);
        
        if (!deleteNote) return res.status(404).json(deleteNote);   

        res.status(200).json(deleteNote)

    } catch (error){
        console.log("Error in updateNote Controller", error)
        res.status(500).json({message: "Internal Server Error"})
    }
};