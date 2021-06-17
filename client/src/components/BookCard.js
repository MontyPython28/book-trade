import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const BookCard = (props) => {
    const  book  = props.book;
    let filepath = '';
    try {
        filepath = book.avatar;
    } catch {
        filepath = "/images/BookShelf.PNG";
    } 

    return(
        <div className="column is-one-quarter">
        <div className="card">
            <div className="card-image">
            <figure className="image is-3by4">
                <img src= {filepath} alt="" /> </figure>
            </div>
            <div className="card-content">
                <h2 className="title is-5">
                    <Link to={`/show-book/${book._id}`}>
                        { book.title }
                    </Link>
                </h2>
                <div className="level">
                  <div className="level-left">
                    <p className="subtitle is-6">{book.isbn}</p>
                 </div>
                 <div className="level-right">
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