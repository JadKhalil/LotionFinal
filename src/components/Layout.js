import { Outlet, Link } from "react-router-dom";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { FaBars } from "react-icons/fa";

function Layout({ notes, addNote, activeNote, setActiveNote }) {
  const [collapsed, setCollapsed] = useState();

  const handleClick = () => setCollapsed(!collapsed);

  const [editSave, toggleEditSave] = useState("edit");

  // holds the object of the selected Note
  const [currNote, setCurrNote] = useState(0);

  const setActiveId = (elem) => {};

  return (
    <>
      {" "}
      <div className="topnav">
        <div className="topnav-centered">
          <h2 id="Title">Lotion</h2>
          <p id="subTitle">Like Notion but worse</p>
        </div>

        <div className="topnav-right">
          <Link to="#" className="bars">
            <FaBars onClick={handleClick} />
          </Link>
        </div>
      </div>{" "}
      <div className="Parent">
        <div className={`child1 ${collapsed ? "hidden" : ""}`}>
          <div className="Notesnav">
            <div className="Notesnav-left">
              <h2 id="Notes">Notes</h2>
            </div>
            <div className="Notesnav-right">
              <Link to="#" className="plus">
                <FaPlus
                  onClick={() => {
                    addNote(currNote);
                    // sets the id to +1 of previous so not duplicate ids are encountered
                    setCurrNote(currNote + 1);
                  }}
                ></FaPlus>
              </Link>
            </div>
          </div>
          {notes.length === 0 ? (
            <p className="note-body-container">No Note Yet</p>
          ) : (
            <ul id="notes-list">
              {notes.map((element, idx) => (
                <li
                  className={`newNote ${
                    element.id === activeNote ? "active" : ""
                  }`}
                >
                  <NavLink key={element.id}
                    to={`/notes/${idx}`}
                    onClick={() => setActiveNote(element.id)}
                  >
                    <div className="newNoteFlex">
                      <div>
                        <h2 className="noteTitle">{element.title.length >= 10 ? element.title.substr(0, 15) + "..." : element.title }</h2>
                      </div>
                      <div>
                        <small className="timeEdit">{element.when}</small>
                      </div>
                      <div>
                        <p className="Body">{element.body.length >= 10 ? element.body.substr(0, 15) + "..." : element.body}</p>
                      </div>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Outlet context={[activeNote]} />
      </div>
    </>
  );
}

export default Layout;