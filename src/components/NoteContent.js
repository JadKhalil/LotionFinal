import { useOutletContext } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    BrowserRouter,
    Navigate,
  } from "react-router-dom";

function NoteContent({ onDeleteNote, notes, onUpdateNote }) {
  const [activeNote] = useOutletContext();

  const { noteId } = useParams();

  const getActiveNote = () => {
    let val = notes.find((note) => note.id === activeNote);
    console.log(val);

    return val;
  };

  const [currtitle, setTitle] = useState(getActiveNote().title);
  const [currBody, setBody] = useState(getActiveNote().body);

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  return (
    <>
      <div className="child2">
        <div className="Input-area">
          <div className="Note-Title">
            {notes.map((note) => {
              if (note.id === activeNote) {
                console.log(note);

                return (
                  <>
                    <h2 className="title">{currtitle}</h2>
                    <p className="date-Time">Date and time</p>
                  </>
                );
              }
            })}
          </div>
          <Link to={`/notes/${noteId}/edit`} className="Buttons edit">
            Edit
          </Link>

          <button
            className="Buttons delete"
            onClick={() => {
            <Navigate replace to={"/notes"} />;
              onDeleteNote(activeNote);
            }}
          >
            Delete
          </button>
        </div>
        <div className="noteStyle">
          {notes.map((note) => {
            if (note.id === activeNote) {
              return <div>{note.body}</div>;
            }
          })}
        </div>
      </div>
    </>
  );
}

{
  /*

<div className="TitleContainer">
            {notes.map((note) => {
              if (note.id === activeNote) {
                return ( <div className="title">
                  <h2 className="title">{note.title}</h2>
                  <p className="date-Time">Date and time</p>
                  </div>
                );
              }
            })
            
            }
            <Link to={`/notes/${noteId}/edit`} onClick={console.log("currtitle edit",currtitle)} className="Buttons edit">
              edit
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
          {notes.map((note) => {
            if (note.id === activeNote) {
              return <h2>{note.body}</h2>;
            }
          })}
        </div>
      </div>
    </>


*/
}

export default NoteContent;
