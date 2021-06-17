import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import BookCard from './BookCard';
import Header from './Header';

class ShowBookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    axios
      .get('/api/books') //ADD http://localhost:8082 when developing (same for all other axios requests)
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
        <Header />
        <div className="container">
          <ul className = "columns is-multiline">
              {bookList}
          </ul>
        </div>
        
      </div>
    );
  }
}

export default ShowBookList;