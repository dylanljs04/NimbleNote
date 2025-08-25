import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';
import { formattedDate } from '../lib/utils.js'
import api from "../lib/axios.js"
import toast  from 'react-hot-toast';


const NoteCard = ({ note, setNotes }) => {

  const handleDelete = async (e, id) =>{
    e.preventDefault();

    if (!window.confirm("Do you want to delete this note?")) return;

    try{
      await api.delete(`/notes/${id}`);
      toast.success("Delete Successfully");
      setNotes((prev) => prev.filter(note => note._id !== id)); // get rid of the deleted notes
    } catch(error){
      console.log("Error in handleDelete ", error);
      toast.error("Error deleting note");
    }
  }
  
    return (
      <Link to={`note/${note._id}`} className="block">
        <div className="card w-96 bg-base-200 shadow-sm hover:shadow-md transition 
                        border-t-4 border-t-gray-300 hover:border-t-primary">
          <div className="card-body">
            {/* Title */}
            <h2 className="card-title text-lg font-bold text-base-content">
              {note.title}
            </h2>
  
            {/* Content */}
            <p className="text-sm text-base-content/90">
              {note.content}
            </p>
  
            {/* Footer (date + icons) */}
            <div className="flex justify-end items-center gap-2 text-base-content/70">
              <div className="group relative">
                <PenSquareIcon className="w-4 h-4 transition duration-200 group-hover:scale-125 group-hover:text-blue-500" />
              </div>

              <button 
                onClick={(e) => handleDelete(e, note._id)} 
                className="group relative">
                <Trash2Icon className="w-4 h-4 transition duration-200 group-hover:scale-125 group-hover:text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  };
  
  export default NoteCard;