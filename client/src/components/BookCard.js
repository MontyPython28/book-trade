import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


// "https://commapress.co.uk/books/the-book-of-cairo/cairo-provisional-v3/image%2Fspan3" original link for image
// "/images/BookShelf.PNG"

const BookCard = (props) => {
    const  book  = props.book;
    const patt1 = /images[^]*/g;
    let filepath = '';
    try {
        filepath = ('\\' + book.file_path.match(patt1));
    } catch {
        filepath = "/images/BookShelf.PNG";
    } 

    return(
        <div className="card">
            <div className="card-image">
            <figure class="image is-3by4">
                <img src= {filepath} alt="" /> </figure>
            </div>
            <div className="card-content">
                <h2 className="title is-5">
                    <Link to={`/show-book/${book._id}`}>
                        { book.title }
                    </Link>
                </h2>
                <p className="subtitle is-6">{book.isbn}</p>
            </div>
        </div>
    )
};

export default BookCard;