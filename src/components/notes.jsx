import { useEffect, useState } from "react";
import { getNotes } from "../api/notes";

function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes().then(setNotes).catch(console.error);
  }, []);

  return (
    <ul>
      {notes.map(n => (
        <li key={n.id}>{n.text}</li>
      ))}
    </ul>
  );
}

export default Notes;
