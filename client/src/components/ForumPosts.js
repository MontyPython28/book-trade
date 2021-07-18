import React, { Component } from 'react';
import '../App.css';

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
      threadname: "",
      threadmcode: "",
      setUp: false
    };
  }

  componentDidMount() {
    axios
      .get(this.serverURL + '/api/posts/' + this.props.match.params.id + '/threads')
      .then(res => {
        this.setState({
          posts: res.data,
        })
        return res.data.posts;
      })
      .catch(err =>{
        console.log(err);
      })
      axios
      .get(this.serverURL + '/api/threads/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          threadname: res.data.title,
          threadmcode: res.data.mcode,
          setUp: true
        })
      })
      .catch(err =>{
        console.log(err);
      })
    ;
    
  };


  render() {
    const posts = this.state.posts;
    let postList;
    
    if(posts.length <= 0) {
      postList = "There are no posts in this thread";
    } else {
      postList = posts.map((post, k) =>
        <ForumPost post={post} key={k}/>
      );
    }

    

    
    return this.state.setUp? (
      <div>
        <Header title={this.state.threadname}/>
        <br />
        <div className="container">
          <div className="column is-10 is-offset-1">
            <div className="box">
              {postList}
            </div>              
            <CreateForumPost thread_id={this.props.match.params.id} thread_mcode={this.state.threadmcode}/>
          </div>
        </div>
      </div>
    ): <Header />;
  }
}

export default ForumPosts;