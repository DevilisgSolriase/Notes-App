import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../api/client'
import { getNotes, deleteNote } from '../api/notesApi'

function Home() {
  const navigate = useNavigate();
  const [showShadow, setShowShadow] = useState(true)
  const scrollRef = useRef(null)
  const [notes, setNotes] = useState([]);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    setShowShadow(scrollTop + clientHeight < scrollHeight)
  }

  async function fetchNotes() {
    console.log('Fetching notes...');
    try {
      const data = await getNotes();
      console.log('Fetched notes:', data);
      setNotes(data);
    } catch (err) {
      console.error('Failed to fetch notes:', err);
    }
  }

  async function handleEdit(noteId) {
    navigate(`/edit_note/${noteId}`);
  }

  async function handleDelete(noteId) {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(noteId);
        fetchNotes(); // Refresh the list
      } catch (err) {
        console.error('Failed to delete note:', err);
      }
    }
  }

  return (
    <main className="flex h-full">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 min-h-screen shadow-xl p-4 py-12 overflow-y-scroll hide-scrollbar">
        <div className="w-full h-[140px] bg-gray-900 rounded-xl p-6 mb-4 flex items-center justify-center hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-shadow" onClick={() => window.location.href = '/new_note'}>
          <h1 className="text-4xl font-bold">+</h1>
        </div>
      </div>

      {/* Content */}
      <div className="w-4/5 bg-gray-800 h-screen p-12">
        <div className="w-full h-[100px] bg-gray-900 rounded-xl p-6 mb-6 flex justify-center items-center">
          {notes.map((note) => (
            <div key={note.id}>
              <h2 className="text-2xl font-bold mb-2">{note.title}</h2>
            </div>
          ))}
        </div>

        <div ref={scrollRef} onScroll={handleScroll} className="w-full max-h-[450px] bg-gray-900 rounded-xl px-6 pt-6 mb-6 overflow-y-scroll hide-scrollbar relative">
          {notes.map((note) => (
            <div key={note.noteId} className="mb-4 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-bold mb-2">{note.title}</h3>
              <p className="text-gray-300 mb-4">{note.content}</p>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(note.noteId)} className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(note.noteId)} className="bg-red-700 hover:bg-red-800 px-3 py-1 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
          {showShadow && (
            <div className="pointer-events-none sticky bottom-0 w-full h-12 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
          )}
        </div>

      </div>
    </main>
  )
}

export default Home