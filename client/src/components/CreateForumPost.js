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
    const [description, setDescription] = useState('');

    const [buttonClass, setButtonClass] = useState('button is-success');


    const onSubmit = e => {
      setButtonClass('button is-success is-loading');
      
      const postData = {
        title: title,
        mcode: props.thread_mcode,
        publisher: currentUser.email,
        description: description,
        thread_id: props.thread_id.toString(),
        likes: 0,
        usersLiked: []
      };

      axios
        .post(serverURL + '/api/posts', postData)
        .then( (res) => {
            setTitle('');
            setDescription('');
            setButtonClass('button is-success is-medium is-outlined is-fullwidth');         
        })
        .catch(err => { console.log('Error in posting:', err.response); });
    }

    return currentUser ? (
      <div className="box">
        <h1 className="subtitle is-5 is-uppercase">Create New Post</h1>
        <form noValidate onSubmit={onSubmit} className="box">
          <div className="columns">
            <div className="column">
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
      </div>
    ) : (<div></div>)
};

export default CreateForumPost;