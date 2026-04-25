import { useState } from 'react';
import AddIcon from "@mui/icons-material/Add";
import {Fab, Zoom} from "@mui/material"
import "./../index.scss";

function CreateArea(props) {
  const [note, setNote] = useState({ title: "", content: "" });
  const [zoomIn, setZoomIn] = useState(false);

  // read and retain note
  const handleChange = (event) => {
    event.preventDefault();
    console.log(event.target.name);
    const { name, value } = event.target;

    setNote((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // add note to note list
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(note.title, note.content);
    props.onAddNote({ title: note.title, content: note.content });
    setNote({title:"", content:""});
  };

  return (
    <div className="container">
      <form className="create-note">
        <input
          name="title"
          placeholder={zoomIn ? "Title" : "Take a note!"}
          onChange={handleChange}
          value={note.title}
          onClick={(event)=>{setZoomIn(true)}
        }
        />
        {zoomIn && <textarea
          name="content"
          placeholder="Take a note..."
          rows="3"
          onChange={handleChange}
          value={note.content}
        />}
        <Zoom in={zoomIn}>
          <Fab onClick={handleSubmit}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
