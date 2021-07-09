import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import BookCard from './BookCard';
import Header from './Header';
import Accordion from './Accordion';
import ForumPost from './ForumPost';
import CreateForumPost from './CreateForumPost';

class SearchQueryResults extends Component {
  // serverURL = 'https://nusbooktrade.herokuapp.com'; //CHANGE
  serverURL = 'http://localhost:4000';
  
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
      .get(this.serverURL + '/api/books/sold')
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

    const newList2 = this.state.posts.filter(post => {
      const title_lower = post.title.toLowerCase();
      const mc_lower = post.mcode.toLowerCase();
      return (title_lower.includes(search) || mc_lower.includes(search));
    });
  
    let bookList;
    let postList;
    if(!newList1.length) {
      bookList =
      <p className="subtitle is-5 has-text-danger">Sorry, we cannot find any books that match your search.</p>;
    } else {
      bookList = newList1.map((book, k) =>
        <BookCard book={book} key={k} />
      );
    }
    if(!newList2.length) {
      postList =
      <p className="subtitle is-5 has-text-danger">Sorry, we cannot find any reviews that match your search.</p>;
    } else {
      postList = newList2.map((post, k) =>
        <ForumPost post={post} key={k} />
      );
    }

    return (
      this.state.setUp ? (
      <div>
        <Header title="Search Results" />
        <div className="container">
          <p className="subtitle is-5">Searching for: {this.props.match.params.query}</p>
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
      ) : (<Header />)
    );
  }
}

export default SearchQueryResults;