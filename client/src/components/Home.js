import React, { Component } from 'react';
import '../App.css';
import '../mystyles.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

import BookCard from './BookCard';
import  Header from './Header';
import CreateForumPost from './CreateForumPost';
import ForumPost from './ForumPost';
import Accordion from './Accordion';


class Home extends Component {
  // serverURL = 'https://nusbooktrade.herokuapp.com'; //CHANGE
  serverURL = 'http://localhost:4000';

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      posts: [],
      start: 0,
      end: 4,
      perPage: 4
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
      .catch(err =>{
        console.log(err);
      });
      axios
      .get(this.serverURL + '/api/posts')
      .then(res => {
        this.setState({
          posts: res.data
        });
      })
      .catch(err =>{
        console.log(err);
      });
  };

  render() {
    const books = this.state.books;
    const posts = this.state.posts;
    let bookList;
    let postList;

    if(!books) {
      bookList = "There are no books for sale yet!";
    } else {
      bookList = books.map((book, k) =>
        <BookCard book={book} key={k} size="is-one-quarter"/>
      );
    }

    if(!posts) {
      postList = "There are no posts yet!";
    } else {
      postList = posts.map((post, k) =>
        <ForumPost post={post} key={k} />
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
            <img src="/Logo2.png" alt="Logo"/>
          </div>
          <div className="column">
            <h1 className="title has-text-centered is-2">Welcome to BookTrade!</h1>
            <div>
            <p className="subtitle is-4 has-text-centered "> Using BookTrade, NUS students can buy and sell textbooks with ease,and at low prices. You can browse through textbooks and put up listings of your own. In addition, we have a forum where you can read and write book reviews.</p>
            </div>
            <br />
            <div>
              <h1 className="title has-text-centered is-3">Main Features </h1>
            </div>
            <div className="columns">
              <div className="column has-text-centered">
                <span class="icon-text is-large">
                  <span class="icon is-large">
                  <i class="fas fa-2x fa-comment-dots"></i>
                  </span>
                </span>
                <h1 className="subtitle is-6">Chat with buyers and sellers in real time</h1>
              </div>
              <div className="column has-text-centered">
                <span class="icon-text is-large">
                  <span class="icon is-large">
                  <i class="fas fa-2x fa-search"></i>
                  </span>
                </span>
              <h1 className="subtitle is-6">Search for textbooks you are interested in</h1>
            </div>
              <div className="column has-text-centered">
              <span class="icon-text is-large">
                  <span class="icon is-large">
                  <i class="fas fa-2x fa-pen"></i>
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
                <p className="card-header-title"> <p className="subtitle">BOOKS FOR SALE</p> </p>
                <div className="card-header-icon">
                  <Link to="/all-books" className="button is-light">
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