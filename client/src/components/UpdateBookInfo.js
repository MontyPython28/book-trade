import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import Header from './Header';

class UpdateBookInfo extends Component {
  
  serverURL = 'https://nusbooktrade.herokuapp.com'; //CHANGE
  //serverURL = 'http://localhost:4000';

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      mcode: '',
      author: '',
      description: '',
      price: '',

      buttonClass: 'button is-primary is-medium is-fullwidth',
      accessControls: false
    };
  }

  componentDidMount() {
    axios
      .get(this.serverURL + '/api/books/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          title: res.data.title,
          mcode: res.data.mcode,
          author: res.data.author,
          description: res.data.description,
          price: res.data.price.$numberDecimal, 
        });
        
        if (this.props.currentUser.email === res.data.publisher) {
          this.setState({ accessControls: true });
        }
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
    this.setState({buttonClass: 'button is-primary is-medium is-fullwidth is-loading'});
    const data = {
      title: this.state.title,
      mcode: this.state.mcode,
      author: this.state.author,
      description: this.state.description,
      price: this.state.price,
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
      this.state.accessControls ? (
      <div>
        <Header title="Edit Listing"/>
        <br />
        <div  className="container">
        <div className="columns">
          <div className="column is-three-fifths is-offset-one-fifth">

            <form noValidate onSubmit={this.onSubmit}>
            <div className="box">
              <div className="field">
                <label className="label">
                <p className="subtitle is-uppercase">Title</p></label>
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
                <label className="label">
                <p className="subtitle is-uppercase">Module Code</p></label>
                <div className="control">
                  <input
                    type='text'
                    placeholder='Module Code'
                    name='mcode'
                    className='input'
                    value={this.state.mcode}
                    onChange={this.onChange}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">
                <p className="subtitle is-uppercase">Author</p></label>
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
                <label className="label">
                <p className="subtitle is-uppercase">Description</p></label>
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
              <label className="label">
              <p className="subtitle has-text-success is-uppercase">Price (SGD)</p></label>
                <div className="control">
                  <input
                    type='number'
                    placeholder='Price'
                    name='price'
                    className='input is-success'
                    value={this.state.price}
                    onChange={this.onChange}
                  />
                </div>
              </div>
            <br />
          </div>
          <button type="submit" className={this.state.buttonClass}>
              Update
          </button>
            </form>
            </div>
          </div>
        </div>
      </div>
      ) : (<Header title="Edit Listing"/>)
    );
  }
}

export default UpdateBookInfo;