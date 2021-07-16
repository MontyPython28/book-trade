import React, { useState } from 'react';
import { useAuth } from "../contexts/AuthContext"
import '../App.css';
import axios from "axios";


// "https://commapress.co.uk/books/the-book-of-cairo/cairo-provisional-v3/image%2Fspan3" original link for image
// "/images/BookShelf.PNG"

const CreateForumThread = (props) => {
    const { currentUser } = useAuth();
    const serverURL = 'https://nusbooktrade.herokuapp.com'; //CHANGE
    // const serverURL = 'http://localhost:4000';

    const [title, setTitle] = useState('');
    const [mcode, setMcode] = useState('');

    const [buttonClass, setButtonClass] = useState('button is-primary is-medium is-outlined is-fullwidth');


    const onSubmit = e => {
        setButtonClass('button is-success is-loading');

        const data = {
            title: title,
            mcode: mcode,
            autogenerated: false, //AKA DIRECTLY CONNECTED TO MODULES REVIEW PAGE
            posts: []
          };

        axios
        .post(serverURL + '/api/threads', data)
        .then(res => {
            setTitle('');
            setMcode('');
        })
        .catch(err => { console.log('Error:', err.response); });
        setButtonClass('button is-primary is-medium is-outlined is-fullwidth');

    }

    return currentUser ? (
        <div className="box">
        <form noValidate onSubmit={onSubmit}>
            <div className="columns">
              <div className="column is-6">
                <label className="label">Title: </label>
                <div className="control">
                  <input
                    type='text'
                    placeholder='Thread Title'
                    name='title'
                    className='input'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>
              </div>

              <div className="column is-3 is-offset-1">
                <label className="label">Module Code: </label>
                <div className="control">
                  <input
                    type='text'
                    placeholder='Module Code'
                    name='mcode'
                    className='input'
                    value={mcode}
                    onChange={e => setMcode(e.target.value)}
                  />
                </div>
              </div>

              <div className="column">
                  <button type="submit" className={buttonClass} onSubmit={onSubmit}>
                    Submit
                  </button>

              </div>
              </div>
                
              </form>
            </div>
    ) : (<div></div>)
};

export default CreateForumThread;