import React from "react";


const CreateForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="w-full max-w-2xl bg-base-200 border border-base-300 rounded-box shadow-md p-6">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-center mb-6">Create Note</h1>

        <form className="flex flex-col gap-4">
          {/* Title */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Title</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter title"
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
            ></textarea>
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
