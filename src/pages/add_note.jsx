import { useState, useRef } from 'react'


function AddNote() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ title, content });
  }

  return (
    <>
      <div className='w-full h-full flex justify-center items-center p-12'>
          <div className='bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-4xl'>
              <h1 className='text-2xl font-bold mb-4'>Add New Note</h1>
              <form onSubmit={handleSubmit}>
                  <div className='mb-4'>
                      <label htmlFor="title" className='block text-sm font-medium mb-1'>Title</label>
                      <input type="text" id="title" className='w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-600 text-white' value={title} onChange={(e) => setTitle(e.target.value)}/>
                  </div>
                  <div className='mb-4'>
                      <label htmlFor="content" className='block text-sm font-medium mb-1'>Content</label>
                      <textarea id="content" rows="5" className='w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-600 text-white' value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                  </div>
                  <button type="submit" className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add Note</button>
              </form>
          </div>
      </div>    
    </>
  )
}

export default AddNote