import React, { Component } from 'react';
import '../App.css';
import '../mystyles.css';
import axios from 'axios';

import ForumPost from './ForumPost';
import CreateForumPost from './CreateForumPost';
import  Header from './Header';


class ForumPosts extends Component {
  serverURL = 'https://nusbooktrade.herokuapp.com'; //CHANGE
  // serverURL = 'http://localhost:4000';

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      thread: {posts: []},
      setUp: false
    };
  }

  componentDidMount() {
    axios
      .get(this.serverURL + '/api/threads/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          thread: res.data,
          setUp: true
        })
        return res.data.posts;
      })
      .then( rawIDs => {
        rawIDs.map((rawID, k) => 
          axios.get(this.serverURL + '/api/posts/' + rawID)
          .then(res => res.data)
          .then(post => this.setState(
            {posts: [...this.state.posts, post]})
          ))
      })
      .catch(err =>{
        console.log(err);
      })
    ;
    
  };


  render() {
    const posts = this.state.posts;
    let postList;

    console.log(posts);
    
    if(posts.length <= 0) {
      postList = "There are no threads created yet!";
    } else {
      postList = posts.map((post, k) =>
        <ForumPost post={post} key={k}/>
      );
    }

    

    
    return this.state.setUp? (
      <div>
        <Header title={this.state.thread.title}/>
        <br />
        <div className="container">
          <div className="column is-10 is-offset-1">
            <div className="box">
              {postList}
            </div>
            <div className="box">
              <h1 title="title is-4">Create New Post</h1>
              <CreateForumPost thread={this.state.thread}/>
            </div>
          </div>
        </div>
      </div>
    ): <Header />;
  }
}

export default ForumPosts;