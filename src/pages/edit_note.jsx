import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, updateNote, deleteNote } from '../api/notesApi';

function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNote();
  }, [id]);

  async function fetchNote() {
    try {
      const note = await getNote(id);
      setTitle(note.title);
      setContent(note.content);
    } catch (err) {
      setError('Failed to load note');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateNote(id, { title, content });
      navigate('/');
    } catch (err) {
      setError('Failed to update note');
    }
  }

  async function handleDelete() {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id);
        navigate('/');
      } catch (err) {
        setError('Failed to delete note');
      }
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='w-full h-full flex justify-center items-center p-12'>
      <div className='bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-4xl'>
        <h1 className='text-2xl font-bold mb-4'>Edit Note</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor="title" className='block text-sm font-medium mb-1'>Title</label>
            <input
              type="text"
              id="title"
              className='w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-600 text-white'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor="content" className='block text-sm font-medium mb-1'>Content</label>
            <textarea
              id="content"
              rows="5"
              className='w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-600 text-white'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-4">
            <button type="submit" className='flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              Update Note
            </button>
            <button type="button" onClick={handleDelete} className='flex-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
              Delete Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditNote;