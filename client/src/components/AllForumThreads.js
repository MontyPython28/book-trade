import React, { Component } from 'react';
import '../App.css';
import '../mystyles.css';
import axios from 'axios';

import ForumThread from './ForumThread';
import CreateForumThread from './CreateForumThread';
import  Header from './Header';


class AllForumThreads extends Component {
  serverURL = 'https://nusbooktrade.herokuapp.com'; //CHANGE
  // serverURL = 'http://localhost:4000';

  constructor(props) {
    super(props);
    this.state = {
      threads: []
    };
  }

  componentDidMount() {
    axios
      .get(this.serverURL + '/api/threads')
      .then(res => {
        this.setState({
          threads: res.data
        })
      })
      .catch(err =>{
        console.log(err);
      });
  };


  render() {
    const threads = this.state.threads;
    let threadList;
    
    if(threads.length <= 0) {
      threadList = "There are no threads created yet!";
    } else {
      threadList = threads.map((thread, k) =>
        <ForumThread thread={thread} key={k}/>
      );
    }

 
    return (
      <div>
        <Header title="Forum Threads"/>
        <br />
        <div className="container">
        <div className="column is-10 is-offset-1">

          <div className="box">
            <div className="level">
              <div className="level-left">
                <div className="subtitle is-5 is-uppercase">Create New Thread</div>
              </div>
            </div>
            <CreateForumThread />
          </div>


          <div className="box">
            {threadList}
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default AllForumThreads;