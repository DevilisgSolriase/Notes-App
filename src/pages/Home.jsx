import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getNotes, deleteNote } from '../api/notesApi'

function Home() {
  const navigate = useNavigate();
  const [showShadow, setShowShadow] = useState(true)
  const scrollRef = useRef(null)
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

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

  useEffect(() => {
    const loadNotes = async () => {
      console.log('Fetching notes...');
      try {
        const data = await getNotes();
        console.log('Fetched notes:', data);
        setNotes(data);
      } catch (err) {
        console.error('Failed to fetch notes:', err);
      }
    };
    loadNotes();
  }, []);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    setShowShadow(scrollTop + clientHeight < scrollHeight)
  }

  async function handleEdit(noteId) {
    navigate(`/edit_note/${noteId}`);
  }

  async function handleDelete(noteId) {
  if (!window.confirm("Are you sure you want to delete this note?")) return;

  try {
    await deleteNote(noteId);

    // Optimistically update UI
    setNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== noteId)
    );
  } catch (err) {
    console.error("Failed to delete note:", err);
    alert("Failed to delete note. Please try again.");
  }
}

  return (
    <main className="flex h-full">
            {/* Content */}
      <div className="w-full bg-gray-800 h-full p-12">
        <div ref={scrollRef} onScroll={handleScroll} className="w-full max-h-[500px] bg-gray-900 rounded-xl px-6 pt-6 mb-6 overflow-y-scroll hide-scrollbar relative">
          {notes.map((note) => (
            <div key={note.NotesID} className="mb-4 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-bold mb-2">{note.title}</h3>
              <p className="text-gray-300 mb-4">{note.content}</p>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(note.NotesID)} className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(note.NotesID)} className="bg-red-700 hover:bg-red-800 px-3 py-1 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div className="w-full h-[140px] bg-gray-900 rounded-xl p-6 mb-4 flex items-center justify-center hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-shadow cursor-pointer" onClick={() => navigate('/new_note')}>
          <h1 className="text-4xl font-bold">+</h1>
        </div>
        </div>
      </div>
    </main>
  )
}

export default Home