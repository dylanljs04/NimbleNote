import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import RateLimitedUI from '../components/RateLimitedUI';
import api from '../lib/axios'
import toast from 'react-hot-toast';
import Note from '../components/NoteCard'
import NoteCard from '../components/NoteCard';
import NotesNotFound from '../components/NotesNotFound';

const HomePage = () => {
  const [isRateLimited, setIsSetRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () =>{
      try{
        console.log("in fetchnotes");
        const res = await api.get("/notes");
        console.log("Success");
        console.log(res.data);
        setNotes(res.data);
        setIsSetRateLimited(false)

      } catch(error){
        console.log(error)
        console.log("Error Fetching Notes");
        if (error.response.status === 429){
          setIsSetRateLimited(true);
        } else{
          toast.error("Failed to Load Notes")
        }
      }
      finally{
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);
  
  return (
    <div className="min-h-screen">
      < NavBar />
      {isRateLimited && < RateLimitedUI /> }
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading Notes...</div> }
        
        {notes.length === 0 && !isRateLimited && < NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map(note => (
              < NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))
            }            
          </div>
        )}


      </div>


    </div>
  )
}

export default HomePage
