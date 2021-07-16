import React from 'react';
import '../App.css';

// "https://commapress.co.uk/books/the-book-of-cairo/cairo-provisional-v3/image%2Fspan3" original link for image
// "/images/BookShelf.PNG"

const ForumPost = (props) => {

   // const serverURL = 'https://nusbooktrade.herokuapp.com'; //CHANGE
   // const serverURL = 'http://localhost:4000';

    return (
        <div className="box">
        <article className="media">
            <figure className="media-left">
                <span className="image is-64x64 has-text-centered">
                  <span className="icon is-large has-text-link">
                    <i className="fas fa-3x fa-user"></i>
                  </span>
                </span>
            </figure>
            <div className="media-content">
                <div className="content">
                    <div className="level">
                    <div className="title is-4">
                        {props.post.title}
                    </div>
                    <div className="subtitle is-7 has-text-link">
                        {props.post.publisher}
                    </div>
                    </div>
                    <div className="columns">
                        <div className="column is-two-thirds">
                            <div className="has-text-primary">{props.post.description} </div>
                        </div>
                    </div>
                </div>
            </div>
            <figure className="media-right">
                <span className="image is-64x64 has-text-centered">
                  <div className="icon is-large"> 
                    <i className="fas fa-3x fa-heart"></i>
                  </div>
                </span>
            </figure>           
        </article>
        </div>
    )
};

export default ForumPost;