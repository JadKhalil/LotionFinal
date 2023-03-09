import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import EmptyLayout from "./components/EmptyLayout";
import EditNoteContent from "./components/EditNoteContent";
import { useEffect, useState } from "react";
import NoteContent from "./components/NoteContent";

function App() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  //const [notes, setNotes] = useState([]);

  const [activeNote, setActiveNote] = useState(0);

  const addNote = (noteId) => {
    let newId = noteId;

    const newNote = { id: newId, title: "Untitled", body: "body", when: "--" };
    setNotes([newNote, ...notes]);
  };

  const onDeleteNote = (noteId) => {
    let active = noteId;
    setNotes(notes.filter(({ id }) => id !== active));
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArray);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              notes={notes}
              addNote={addNote}
              activeNote={activeNote}
              setActiveNote={setActiveNote}
              setNotes={setNotes}
            />
          }
        >
          <Route index element={<EmptyLayout />} />
          <Route path="/notes" element={<EmptyLayout />} />
          <Route
            path="/notes/:noteId" //error is this line of code here
            element={
              notes.length === 0 ? (
                <Navigate replace to={"/notes"} />
              ) : (
                <NoteContent
                  onDeleteNote={onDeleteNote}
                  notes={notes}
                  onUpdateNote={onUpdateNote}
                />
              )
            }
          />
          <Route
            path="/notes/:noteId/edit"
            element={
              notes.length === 0 ? (
                <Navigate replace to={"/notes"} />
              ) : (
                <EditNoteContent
                  onDeleteNote={onDeleteNote}
                  notes={notes}
                  onUpdateNote={onUpdateNote}
                  setNotes={setNotes}
                />
              )
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

{
  /*


*/
}

export default App;
