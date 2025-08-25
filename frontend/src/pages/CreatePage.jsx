import React, { useState } from 'react'
import Form from '../components/CreateForm'
import { ArrowLeftIcon } from 'lucide-react';
import { Link, useNavigate} from 'react-router';
import RateLimitedUI from '../components/RateLimitedUI';
import api from '../lib/axios'
import toast from 'react-hot-toast';



const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()){
      toast.error("All fields are Rquired!");
      return
    }

    setLoading(true);

    try{
      await api.post("/notes", {title, content});
      toast.success("Note Created Successfully!");
      navigate("/");
      
      
    } catch(error){
      console.log("Error creating note", error);
      if (error.response.status === 429){
        toast.error("You're creating notes too fast!", {
          duration: 4000,
        })
      } else{
        toast.error("Failed to create Note");
      }
    }

    finally{
      setLoading(false);
    }
  }

  return (
    <div>
      <Link to='/' className='btn btn-ghost mb-6 absolute top-4 left-4 rounded-full'>
          <ArrowLeftIcon className='size-5' />
          Back to Notes
      </Link>

      {/* THis is the actual form */}
      <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="w-full max-w-2xl bg-base-200 border border-base-300 rounded-box shadow-md p-6">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-center mb-6">Create Note</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Title</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          {/* Content */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Content</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Enter content"
              rows="4"
              value={content}
              onChange={e => setContent(e.target.value)}

            ></textarea>
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary w-full">
            { loading ? "Creating..." : "Submit"}
          </button>
        </form>
      </div>
    </div>

  </div>
  )
}

export default CreatePage;
