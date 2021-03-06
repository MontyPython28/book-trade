import React, { Component } from 'react';
import '../mystyles.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

import BookCard from './BookCard';
import  Header from './Header';


class Home extends Component {
  serverURL = 'https://nusbooktrade.herokuapp.com'; //CHANGE
  // serverURL = 'http://localhost:4000';

  /* EDIT CSS BEFORE POSTING: 
  a:hover {
    ...
    text-decoration: none;
    font-weight: bold;
  } */

  constructor(props) {
    super(props);
    this.state = {
      books: [],

      start: 0,
      end: 4,
      perPage: 4,

      setUp: false
    };
  }

  componentDidMount() {
    axios
      .get(this.serverURL + '/api/books/forSale')
      .then(res => {
        this.setState({
          books: res.data
        })
      })
      .then (res => {
        this.setState({
          setUp: true
        })
      })
      .catch(err =>{
        console.log(err);
      });
  };

  render() {
    const books = this.state.books;
    let bookList = [];

    if(this.state.setUp && books.length <= 0) {
      bookList = "There are no books for sale yet!";
    } else if (this.state.setUp) {
      bookList = books.map((book, k) =>
        <BookCard book={book} key={k} size="is-one-quarter"/>
      );
    }

    const backButton = <div className="column is-1 has-text-centered"><button className="button" 
      onClick={e => this.state.start <= 0 ? console.log('') 
      : this.setState({start: this.state.start - this.state.perPage, end: this.state.end - this.state.perPage})}
    >
      <div className="icon-text">
        <span className="icon"> <i className="fas fa-angle-left"></i> </span>
      </div>
    </button> </div>

    const frontButton = <div className="column is-1 has-text-centered"><button className="button" 
      onClick={e => this.state.start + this.state.perPage >= bookList.length ? console.log('')
      : this.setState({start: this.state.start + this.state.perPage, end: this.state.end + this.state.perPage})}
    > 
      <div className="icon-text">
        <span className="icon"> <i className="fas fa-angle-right"></i> </span>
      </div>
    </button> </div>

    return (
      <div>
        <Header/>
        <div className="container">

        <div className="box">
        <div className="columns">
          <div className="column is-one-third has-text-centered">
            <img src="/images/Logo2.png" alt="Logo"/>
          </div>
          <div className="column">
            <h1 className="title has-text-centered is-2">Welcome to BookTrade!</h1>
            <div>
            <p className="subtitle is-4 has-text-centered "> Using BookTrade, NUS students can buy and sell textbooks with ease, and at low prices. You can browse through textbooks and put up listings of your own. In addition, we have a forum where you can read and write book reviews.</p>
            </div>
            <br />
            <div>
              <h1 className="title has-text-centered is-3">Main Features </h1>
            </div>
            <div className="columns">
              <div className="column has-text-centered">
                <span className="icon-text is-large">
                  <span className="icon is-large has-text-link">
                  <i className="fas fa-2x fa-comment-dots"></i>
                  </span>
                </span>
                <h1 className="subtitle is-6">Chat with buyers and sellers in real time</h1>
              </div>
              <div className="column has-text-centered">
                <span className="icon-text is-large">
                  <span className="icon is-large has-text-link">
                  <i className="fas fa-2x fa-search"></i>
                  </span>
                </span>
              <h1 className="subtitle is-6">Search for textbooks you are interested in</h1>
            </div>
              <div className="column has-text-centered">
              <span className="icon-text is-large">
                  <span className="icon is-large has-text-link">
                  <i className="fas fa-2x fa-pen"></i>
                </span>
              </span>
              <h1 className="subtitle is-6">Post reviews on our forum</h1>
            </div>
          </div>
          </div>
          </div>

        </div>
        
          <div className = "columns is-vcentered">
            {backButton}
            <div className="column is-10">
            <div className="card is-full">
              <header className="card-header">
                <div className="card-header-title"> <p className="subtitle">BOOKS FOR SALE</p> </div>              <div className="card-header-icon">
                  <Link to="/all-books" className="button is-primary">
                  <div>Browse More</div></Link>
                </div>
              </header>
              <div className="box" ref={(content) => this.content = content }> 
                  <div className="columns">
                    {bookList.slice(this.state.start, this.state.end)}
                  </div> 
              </div>
            </div>
            </div>
            {frontButton}
          </div>         
          
          {/*
          <br />
          <Accordion title="Book Review Forum">
            <CreateForumPost />
            <br />
            {postList}
          </Accordion> */}
        </div>
      </div>
    );
  }
}

export default Home;