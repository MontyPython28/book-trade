import React from 'react';
import '../App.css';

// "https://commapress.co.uk/books/the-book-of-cairo/cairo-provisional-v3/image%2Fspan3" original link for image
// "/images/BookShelf.PNG"

const ForumPost = (props) => {

    return (
        <div className="level">
        <article className="media">
            <div className="media-content">
                <div className="content">
                <p>
                    <strong>{props.post.title}</strong> <small>{props.post.publisher}</small> <small>{props.post.likes} likes</small>
                    <br />
                    {props.post.description}
                </p>
                </div>
                <nav className="level is-mobile">
                <div className="level-left">
                    <div className="level-item">
                    <span className="icon is-small"><i className="fas fa-heart"></i></span>
                    </div>
                </div>
                </nav>
            </div>
            
        </article>
        </div>
    )
};

export default ForumPost;