import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import CardWishlistButton from './CardWishlistButton';


// "https://commapress.co.uk/books/the-book-of-cairo/cairo-provisional-v3/image%2Fspan3" original link for image
// "/images/BookShelf.PNG"

const BookCard = (props) => {
    const serverURL = 'https://nusbooktrade.herokuapp.com'; //CHANGE
    // const serverURL = 'http://localhost:4000';

    const  book  = props.book;
    let filepath = '';
    try {
        filepath = book.avatar;
    } catch {
        filepath = "/images/BookShelf.PNG";
    } 

    return (
        <div className = {"column " + props.size}>
        <Link to={`/show-book/${book._id}`} className="box p-0">
            <div className="card-image">
            <figure className="image is-3by4">
                <img src= {filepath} alt="" /> </figure>
            </div>
            <div className="card-content">
                <div className="media">
                <div className="media-content">
                <h2 className="subtitle is-5">
                    <Link to={`/show-book/${book._id}`} >
                        { book.title }
                    </Link>
                    <p className="subtitle is-7"> {book.publisher} </p>
                </h2>
                </div>
                </div>
                <div className="columns">
                  <div className="column is-half">
                    <p className="subtitle is-6">{book.mcode}</p>
                 </div>
                 <div className="column is-half has-text-right">
                    <p className="subtitle is-6 has-text-success has-text-weight-bold">
                    {book.price.$numberDecimal} SGD</p>
                 </div>
                </div>
                <CardWishlistButton email={book.publisher} id={book._id} serverURL={serverURL}/>        
            </div>
        </Link>
        </div>
    )
};

export default BookCard;