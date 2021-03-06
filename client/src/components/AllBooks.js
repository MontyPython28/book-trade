import React, { Component } from 'react';
import '../App.css';
import '../mystyles.css';
import axios from 'axios';

import BookCard from './BookCard';
import  Header from './Header';


class AllBooks extends Component {
  serverURL = 'https://nusbooktrade.herokuapp.com'; //CHANGE
  //serverURL = 'http://localhost:4000';

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      setUp: false
    };
  }

  componentDidMount() {
    axios
      .get(this.serverURL + '/api/books/forSale')
      .then(res => {
        this.setState({
          books: res.data,
          setUp: true
        })
      })
      .catch(err =>{
        console.log(err);
      });
  };


  render() {
    const books = this.state.books;
    let bookList;

    if(books.length <= 0) {
      bookList = "There are no books for sale yet.";
    } else {
      bookList = books.map((book, k) =>
        <BookCard book={book} key={k} size="is-one-fifth"/>
      );
    }

    
    return this.state.setUp ? (
      <div>
        <Header title="Browse Listings"/>
        <br />
        <div className="container">
          <div className="box">
          <div className="columns is-multiline">
          {bookList}
            </div>
          </div>
        </div>
        <br />
      </div>
    ) : <Header title="Browse Listings"/>;
  }
}

export default AllBooks;