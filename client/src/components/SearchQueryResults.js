import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import BookCard from './BookCard';
import Header from './Header';

class SearchQueryResults extends Component {
  serverURL = 'https://nusbooktrade.herokuapp.com'; //CHANGE
  //serverURL = 'http://localhost:4000';
  
  constructor(props) {
    super(props); //this.props.match.params.query is the query name
    this.state = {
      books: [],
      posts: [],
      setUp: false
    };
  }

  componentDidMount() {
    axios
      .get(this.serverURL + '/api/books/forSale')
      .then(res => {
        this.setState({ books: res.data });
      })
      .catch(err => {
        console.log(err);
      });
      axios
      .get(this.serverURL + '/api/posts/')
      .then(res => {
        this.setState({ posts: res.data });
        this.setState({ setUp: true });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {

    const search = this.props.match.params.query.toLowerCase();

    const newList1 = this.state.books.filter(book => {
      const title_lower = book.title.toLowerCase();
      const mc_lower = book.mcode.toLowerCase();
      return (title_lower.includes(search) || mc_lower.includes(search));
    });
  
    let bookList;
    if(!newList1.length) {
      bookList = <p className="title is-5 has-text-primary">
        Sorry, we cannot find any books that match your search.</p>;
    } else {
      bookList = newList1.map((book, k) =>
        <BookCard book={book} key={k} size="is-one-fifth"/>
      );
    }

    return (
      this.state.setUp ? (
      <div>
        <Header title={"Search Results for '" + this.props.match.params.query + "'"}/>
        <br />
        <div className="container">
          <div className="box">
            <div className = "columns is-multiline">
                {bookList}
            </div>
          </div>
        </div>
        <br />
      </div>
      ) : (<Header title={"Search Results for '" + this.props.match.params.query + "'"}/>)
    );
  }
}

export default SearchQueryResults;