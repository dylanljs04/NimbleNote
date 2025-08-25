import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, Factory, LoaderIcon, Trash2Icon } from 'lucide-react';

const NoteDetailPage = () => {  
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const {id} = useParams();

  const handleDelete = async() => {
    if (!window.confirm("Are you Sure?")) return;

    try{
      await api.delete(`/notes/${id}`);
      toast.success("Note Successfully Deleted");
      navigate("/");

    } catch (error){
      console.log("Error in handleDelete, ", error);
      toast.error("Unable to Delete Note")
    }
  }

  const handleSave = async() =>{
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please fill in all fields");
      return;
    }

    setSaving(true);

    try{
      await api.put(`/notes/${id}`, note);
      toast.success("Note Saved Successfully");
      navigate("/")

    } catch (error){
      console.log("Error in handleSave, ", error);
      toast.error("Unable to Save Note");

    } finally{
      setSaving(false);
    }
  }

  useEffect(() => {
    const fetchNotes = async () => {
    try{
      const res = await api.get(`/notes/${id}`);
      setNote(res.data);
      console.log(res.data)

    } catch(error){
      toast.error("Failed to fetch data");
      console.log("Error in NoteDetailPage: ", error);

    } finally{
      setLoading(false);

    }
  }
  fetchNotes(); 
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }
  
  return (
    <div className='min-h-screen bg-base-100'>
      <div className="container mx-auto px-4 py-8">
        <div className='max-w-2xl mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            <Link to={"/"} className="btn btn-ghost">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>

            <button onClick={handleDelete} className='btn btn-error btn-outline'>
              <Trash2Icon className='size-5'/>
              Delete Note
            </button>

          </div>

          <div className='bg-base-200'>
            <div className="card-body">

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="card-actions justify-end">
                <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}


                </button>
              </div>

            </div>        
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default NoteDetailPage
