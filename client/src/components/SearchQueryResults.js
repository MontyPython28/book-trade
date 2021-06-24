import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import BookCard from './BookCard';
import Header from './Header';


class SearchQueryResults extends Component {
  //serverURL = 'https://nusbooktrade.herokuapp.com'; //CHANGE
  serverURL = 'http://localhost:4000'
  
  constructor(props) {
    super(props); //this.props.match.params.query is the query name
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    axios
      .get(this.serverURL + '/api/books/')
      .then(res => {
        this.setState({
          books: res.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  };

  render() {
    const newList = this.state.books.filter(book => {
      const search = this.props.match.params.query.toLowerCase();
      const title_lower = book.title.toLowerCase();
      const mc_lower = book.isbn.toLowerCase();
      return (title_lower.includes(search) || mc_lower.includes(search));
    });
  
    let bookList;
    if(!newList.length) {
      bookList =
      <p className="subtitle is-5 has-text-danger">Sorry, we cannot find any books that match your search.</p>;
    } else {
      bookList = newList.map((book, k) =>
        <BookCard book={book} key={k} />
      );
    }

    return (
      <div>
        <Header title="Search Results" />
        <div className="container">
          <p className="subtitle is-5">Searching for: {this.props.match.params.query}</p>
          <ul className = "columns is-multiline">
              {bookList}
          </ul>
        </div>
      </div>
    );
  }
}

export default SearchQueryResults;