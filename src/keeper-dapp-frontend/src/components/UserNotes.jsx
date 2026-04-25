// Not used in latest updated app
import noteList from '../notes.js';
import Note from './Note.jsx';

function getUserNotes(userName) {
    return(noteList.findIndex(e => e.userName === userName));
}

function UserNotes(props) {
    let idx = getUserNotes(props.userName);
    return(
         idx !== -1 ? 
            userNotes[idx].notes.map((note) => <Note key={note.key} title={note.title} content={note.content} />) :
            <h1>Invalid user</h1>
    );
}

export default UserNotes;