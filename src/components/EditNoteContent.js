import { useOutletContext } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";

function EditNoteContent({ onDeleteNote, notes, onUpdateNote, setNotes }) {
  const [activeNote] = useOutletContext();

  const { noteId } = useParams();

  // have two functions for update body and update title,

  const getActiveNote = () => {
    let val = notes.find((note) => note.id === activeNote);
    return val;
  };

  const [currtitle, setTitle] = useState(getActiveNote().title);
  const [currBody, setBody] = useState(getActiveNote().body);

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const setSave = () => {
    const updateNote = notes.map((note) => {
      if (activeNote === note.id) {
        const newDate = new Date();
        return {
          ...note,
          title: currtitle,
          body: currBody,
          when: "currDate",
        };
      } else {
        return note;
      }
    });
    setNotes([...updateNote]);
  };

  return (
    <>
      <div className="child2">
        <div className="Input-area">
          <div className="TitleContainer">
            <input
              type="text"
              className="textIn"
              value={currtitle}
              onChange={handleTitle}
            />
            <Link
              to={`/notes/${noteId}`}
              onClick={() => {
                console.log("currTitle save button", currtitle);
                setSave();
              }}
              className="Buttons"
            >
              Save
            </Link>

            <button
              className="Buttons"
              id="delete"
              onClick={() => {
                onDeleteNote(activeNote);
              }}
            >
              delete
            </button>
          </div>
        </div>
        <div id="quill-body" className="">
          <ReactQuill theme="snow" value={currBody} onChange={setBody} />
        </div>
      </div>
    </>
  );
}

export default EditNoteContent;
