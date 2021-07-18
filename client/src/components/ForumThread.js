import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

// "https://commapress.co.uk/books/the-book-of-cairo/cairo-provisional-v3/image%2Fspan3" original link for image
// "/images/BookShelf.PNG"

const ForumThread = (props) => {
    const serverURL = 'https://nusbooktrade.herokuapp.com'; //CHANGE
    // const serverURL = 'http://localhost:4000';

    const [count, setCount] = useState(0);

    useEffect(() => {
        axios.get(serverURL + '/api/posts/' + props.thread._id +'/threads')
        .then(res => {
          setCount(res.data.length)
        })
        .catch(err => console.log(err))
      }
    );

    /*const onDeleteClick = e => {
      axios
      .delete(serverURL + '/api/threads/'+ props.thread._id)
      .catch(err => {
        console.log("Error from ForumThread_deleteClick");
        console.log(err);
      })
        
    } */

    return (
        <div className="box">
        <article className="media">
            <figure className="media-left">
                <span className="image is-64x64 has-text-centered">
                  <span className="icon is-large has-text-link">
                    <i className="fas fa-3x fa-comments"></i>
                  </span>
                </span>
            </figure>
            <div className="media-content">
                <div className="content">
                    <div className="title is-4">
                        {props.thread.title}
                    </div>
                    <div className="columns">
                        <div className="column title is-5 has-text-primary">
                            {props.thread.mcode}
                        </div>
                        <div className="column title is-5 has-text-primary">
                          {count === 1 ? (<div>1 post</div>) : (<div>{count} posts </div>)}
                        </div>
                    </div>
                

                </div>
            </div>
            <figure className="media-right">
                <span className="image is-64x64 has-text-centered">
                  <Link to={`/forum/${props.thread._id}`}  className="icon is-large" title={props.thread.title}> 
                    <i className="fas fa-3x fa-angle-right"></i>
                  </Link>
                </span>
            </figure>           
        </article>
        </div>
    )
};

export default ForumThread;