import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

// "https://commapress.co.uk/books/the-book-of-cairo/cairo-provisional-v3/image%2Fspan3" original link for image
// "/images/BookShelf.PNG"

const ForumThread = (props) => {
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
                            {props.thread.posts.length} replies
                        </div>
                    </div>
                

                </div>
            </div>
            <figure className="media-right">
                <span className="image is-64x64 has-text-centered">
                  <Link to={`/forum/${props.thread._id}`}  className="icon is-large"> 
                    <i className="fas fa-3x fa-angle-right"></i>
                  </Link>
                </span>
            </figure>           
        </article>
        </div>
    )
};

export default ForumThread;