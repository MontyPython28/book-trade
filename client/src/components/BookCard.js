import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


// "https://commapress.co.uk/books/the-book-of-cairo/cairo-provisional-v3/image%2Fspan3" original link for image
// "/images/BookShelf.PNG"

const BookCard = (props) => {
    const  book  = props.book;
    let filepath = '';
    try {
        filepath = book.avatar;
    } catch {
        filepath = "/images/BookShelf.PNG";
    } 

    return(
        <div className = "column is-one-quarter">
        <div className="card">
            <div className="card-image">
            <figure className="image is-3by4">
                <img src= {filepath} alt="" /> </figure>
            </div>
            <div className="card-content">
                <h2 className="subtitle is-5">
                    <Link to={`/show-book/${book._id}`}>
                        { book.title }
                    </Link>
                </h2>
                <div className="columns">
                  <div className="column is-half">
                    <p className="subtitle is-6">{book.isbn}</p>
                 </div>
                 <div className="column is-half has-text-right">
                    <p className="subtitle is-6 has-text-success has-text-weight-bold">
                    {book.publisher} SGD</p>
                 </div>
                </div>
            </div>
        </div>
        </div>
    )
};

export default BookCard;