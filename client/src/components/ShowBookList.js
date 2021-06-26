import React, { Component } from 'react';
import '../App.css';
import '../mystyles.css';
import axios from 'axios';
import BookCard from './BookCard';
import  Header from './Header';


class ShowBookList extends Component {
  //serverURL = 'https://nusbooktrade.herokuapp.com'; //CHANGE
  serverURL = 'http://localhost:4000';
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    axios
      .get(this.serverURL + '/api/books')
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
        <Header title="View Book List" />
        <div className="container">
          <div className = "columns is-multiline">
              {bookList}
          </div>
        </div>
        
      </div>
    );
  }
}

export default ShowBookList;