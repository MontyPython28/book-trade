import React, { useState } from 'react';
import { useAuth } from "../contexts/AuthContext"
import '../App.css';
import axios from "axios";


// "https://commapress.co.uk/books/the-book-of-cairo/cairo-provisional-v3/image%2Fspan3" original link for image
// "/images/BookShelf.PNG"

const CreateForumPost = (props) => {
    const { currentUser } = useAuth();
    const serverURL = 'https://nusbooktrade.herokuapp.com'; //CHANGE
    // const serverURL = 'http://localhost:4000';

    const [title, setTitle] = useState('');
    const [mcode, setMcode] = useState('');
    const [description, setDescription] = useState('');

    const [buttonClass, setButtonClass] = useState('button is-success');


    const onSubmit = e => {
        e.preventDefault();
        setButtonClass('button is-success is-loading');

        const data = {
            title: title,
            mcode: mcode,
            publisher: currentUser.email,
            description: description,
            likes: 0
          };

        axios
        .post(serverURL + '/api/posts', data)
        .then(res => {
            setTitle('');
            setMcode('');
            setDescription('');
        })
        .catch(err => { console.log('Error:', err.response); });
        setButtonClass('button is-success is-medium is-outlined is-fullwidth');

    }

    return currentUser ? (
        <form noValidate onSubmit={onSubmit} className="box">
            <div className="columns">
              <div className="column is-three-fifths">
                <label className="label">Title: </label>
                <div className="control">
                  <input
                    type='text'
                    placeholder='Title of Post'
                    name='title'
                    className='input'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>
              </div>

              <div className="column is-one-fifth is-offset-one-fifth">
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
              </div>
              
              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <textarea
                    type='text'
                    placeholder='Describe this book'
                    name='description'
                    className='textarea'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>
              </div>
 
                <button type="submit" className={buttonClass}>
                    Submit
                  </button>
              </form>
    ) : (<div></div>)
};

export default CreateForumPost;