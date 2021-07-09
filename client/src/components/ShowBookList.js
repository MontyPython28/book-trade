import React, { Component } from 'react';
import '../App.css';
import '../mystyles.css';
import axios from 'axios';

import BookCard from './BookCard';
import  Header from './Header';
import CreateForumPost from './CreateForumPost';
import ForumPost from './ForumPost';
import Accordion from './Accordion';
import Pagination from './Pagination';


class ShowBookList extends Component {
  // serverURL = 'https://nusbooktrade.herokuapp.com'; //CHANGE
  serverURL = 'http://localhost:4000';

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      posts: [],
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
        <BookCard book={book} key={k} />
      );
    }

    if(!posts) {
      postList = "There are no posts yet!";
    } else {
      postList = posts.map((post, k) =>
        <ForumPost post={post} key={k} />
      );
    }

    return (
      <div>
        <Header title="Welcome to BookTrade!" />
        <div className="container">
          <Accordion title="Books for Sale">
          <div className = "columns is-multiline">
              {/*<Pagination postsPerPage={4} totalPosts={10} paginate={e => e} lst={bookList}/> */}
              {bookList}
          </div>
          </Accordion>
          <br />
          <Accordion title="Book Review Forum">
            <CreateForumPost />
            <br />
            {postList}
          </Accordion>
        </div>
      </div>
    );
  }
}

export default ShowBookList;