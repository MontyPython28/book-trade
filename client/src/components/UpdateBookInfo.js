import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import Navbar from './Navbar';
import {useAuth} from './context/AuthContext';

class UpdateBookInfo extends Component {
  serverURL = 'https://nusbooktrade.herokuapp.com'; //CHANGE

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      isbn: '',
      author: '',
      description: '',
      publisher: '',
      buttonClass: 'button is-info is-medium is-outlined is-fullwidth'
    };
  }

  componentDidMount() {
    axios
      .get(this.serverURL + '/api/books/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          title: res.data.title,
          isbn: res.data.isbn,
          author: res.data.author,
          description: res.data.description,
          publisher: res.data.publisher,
        })
      })
      .catch(err => {
        console.log("Error from UpdateBookInfo", err);
      })
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({buttonClass: 'button is-info is-medium is-outlined is-fullwidth is-loading'});
    const data = {
      title: this.state.title,
      isbn: this.state.isbn,
      author: this.state.author,
      description: this.state.description,
      publisher: this.state.publisher,
    };

    axios
      .put(this.serverURL + '/api/books/' + this.props.match.params.id, data)
      .then(res => {
        this.props.history.push('/show-book/'+this.props.match.params.id);
      })
      .catch(err => {
        console.log("Error in UpdateBookInfo!");
      })
  };


  render() {
    return (
      <div className="container">
        <div className="columns">
          <div className="column is-three-fifths is-offset-one-fifth">
              <br />
              <Link to="/" className="button is-primary float-left">
                  Show Book List
              </Link>
              <br />
              <h1 className="subtitle is-3 has-text-centered">Edit Book</h1>

            <form noValidate onSubmit={this.onSubmit}>
              <div className="field">
                <label className="label">Title</label>
                <div className="control">
                  <input
                    type='text'
                    placeholder='Title of the Book'
                    name='title'
                    className='input'
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Module Code</label>
                <div className="control">
                  <input
                    type='text'
                    placeholder='Module Code'
                    name='isbn'
                    className='input'
                    value={this.state.isbn}
                    onChange={this.onChange}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Author</label>
                <div className="control">
                  <input
                    type='text'
                    placeholder='Author'
                    name='author'
                    className='input'
                    value={this.state.author}
                    onChange={this.onChange}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <textarea
                    type='text'
                    placeholder='Describe this book'
                    name='description'
                    className='textarea'
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                </div>
              </div>

              <div className="field">
              <label className="label has-text-success">Price (in SGD)</label>
                <div className="control">
                  <input
                    type='text'
                    placeholder='Price'
                    name='publisher'
                    className='input is-success'
                    value={this.state.publisher}
                    onChange={this.onChange}
                  />
                </div>
              </div>
            <br />
            <button type="submit" className={this.state.buttonClass}>
              Update
            </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateBookInfo;