import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Login from './Login.jsx'
import CreateArea from './CreateArea.jsx';
import Note from './Note.jsx';

// static local notes
import noteList from '../notes.js';

import React, {useState, useEffect} from 'react';
import { keeper_dapp_backend } from '../../../declarations/keeper-dapp-backend/index.js';

// Pull the existing notes from the notes object.
// this can be storage
// let currentUser = "none";
async function getUserNotes(userName) {
    // instead of getting it locally, fetch from backend
    // const userContent = noteList.find(e => e.userName === userName);
    // return(userContent.notes);
    let readNotes = await keeper_dapp_backend.readNotes(userName);
    console.log(`getUserNotes for ${userName}`);
    return readNotes;
}

function App() {
    const [userValidated, setUserValidated] = useState(false);
    const [userNotes, setUserNotes] = useState([]);
    const [currentUser, setCurrentUser] = useState("none");

    // Login, only checking valid user name
    const handleValidation = async (userName) => {
        console.log(`handleValidation for ${userName}`);
        setUserNotes([]); // clear notes when new user login
        setCurrentUser(userName);
        setUserValidated(true);
    }

    const handleLogout = () => {
        setCurrentUser("none");
        setUserNotes([]);
        setUserValidated(false);
    };

    // Add note call back, passed to CreateArea to append note to users notes.
    const handleAddNote = async (note) => {
        console.log(`handleAddNote: ${note.title}, ${note.content}`);

        // first update receved note to backend, this is async
        // now call async backend update following by state update
        await keeper_dapp_backend.addNote(currentUser, note.title, note.content);

        let userNotes = await getUserNotes(currentUser);
        setUserNotes(userNotes);
    }

    // Delete note callback, called from Note component when its deleted
    // Magic is we can use id which was passed when it was created!!
    const handleDeleteNote = async (note) => {
        console.log(`handleDeleteNote: ${note.title}, ${note.content}`);

        // note -> {id, title, content}
        await keeper_dapp_backend.deleteNote(currentUser, note.title);

        let userNotes = await getUserNotes(currentUser);
        setUserNotes(userNotes);
    }

    // use effect hook to pull the notes on the render
    useEffect(()=>{
        async function fetchData (userName) {
            console.log(`fetchData for ${userName}`);
            setUserNotes([]); // clear notes before fetching, this is for better UI experience, since backend call is async, we can show empty notes first then update to real notes when backend call is done.
            let userNotes = await getUserNotes(userName);
            setUserNotes(userNotes);
        }
        if(currentUser != "none" && userValidated) {
            fetchData(currentUser);
        }
    }, [currentUser, userValidated]);

    return (
        <div>
        <Header onLogout={handleLogout} isValid = {userValidated} userName={currentUser}/>
        {userValidated ? (
            <div>

            <CreateArea onAddNote={handleAddNote} />

            <div className='container'>
            {userNotes.map((note, idx) => (
                <Note
                key={idx}
                id={idx}
                title={note.title}
                content={note.content}
                onDeleteNote={handleDeleteNote}
                />
            ))}
            </div>
            </div>
        ) : (
            <Login onValidate={handleValidation} />
        )}
        <Footer />
        </div>
    );
}

export default App;
