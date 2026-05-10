import React, {useState} from 'react';
import userNotes from './../notes.js';
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login'

import { keeper_dapp_backend } from '../../../declarations/keeper-dapp-backend/index.js';

function  Login(props) {
    const [newUser, setNewUser] = useState(null)
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const receivedUserName = e.target.userName.value;

        console.log(`received user ${receivedUserName}`)

        // validate user from backend, if doesn't exist then create one
        let userValid = await keeper_dapp_backend.validateUser(receivedUserName);
        if(userValid) {
            console.log(`validated user name ${receivedUserName}`)
        } else {
            // create a new user, with sample note
            // later add some id validation
            console.log(`creating new user ${receivedUserName}`);
            keeper_dapp_backend.addNote(receivedUserName, `Welcome ${receivedUserName}!`, "This is your first note!");
            setNewUser(receivedUserName);
        }
        props.onValidate(receivedUserName);
    };

    return (
      <form onSubmit={handleSubmit} className="login">
        <input name="userName" type="text" placeholder="Username" />
        <Button variant='contained' endIcon={<LoginIcon />}  type='submit'>
          Enter
        </Button>
        {newUser && <p>{`created new user ${newUser}!`} </p>}
      </form>
    );
}

export default Login;