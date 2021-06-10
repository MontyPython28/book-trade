import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';

class ShowBookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/books') //ADD http://localhost:8082 when developing (same for all other axios requests)
      .then(res => {
        this.setState({
          books: res.data
        })
      })
      .catch(err =>{
        console.log(err);
      })
  };


  render() {
    const books = this.state.books;
    console.log("PrintBook: " + books);
    let bookList;

    if(!books) {
      bookList = "There is no book record!";
    } else {
      bookList = books.map((book, k) =>
        <BookCard book={book} key={k} />
      );
    }

    return (
      <div>
        <div className="container">
          <br />
          <div className="columns">
          <div className="column has-background-info is-focused">
            <h2 className="title is-1 has-text-white">Hello, Username</h2>
            <h2 className="subtitle is-3 has-text-light">Welcome to Booktrade!</h2>
          </div>
        </div>
          <br />
          <Link to="/create-book" className="button is-primary">
              Add New Book
            </Link>
        </div>


          <div className="container">
            <div className = "list">
                {bookList}
            </div>
          </div>
        
      </div>
    );
  }
}

export default ShowBookList;