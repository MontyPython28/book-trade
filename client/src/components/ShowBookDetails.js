import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

class showBookDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {}
    };
  }

  componentDidMount() {
    axios
      .get('/api/books/'+this.props.match.params.id) //ADD http://localhost:8082 when developing (same for all other axios requests)
      .then(res => {
        this.setState({
          book: res.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  };

  onDeleteClick (id) {
    axios
      .delete('/api/books/'+id) //ADD http://localhost:8082 when developing (same for all other axios requests)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("Error form ShowBookDetails_deleteClick");
      })
  };


  render() {

    const book = this.state.book;
    let BookItem = <div>
      <table className="table is-bordered is-striped">
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Title</td>
            <td>{ book.title }</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Module Code</td>
            <td>{ book.isbn }</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Author</td>
            <td>{ book.author }</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Description</td>
            <td>{ book.description }</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Price (in SGD)</td>
            <td>{ book.publisher }</td>
          </tr>
        </tbody>
      </table>
    </div>

    return (
      <div className="container">
        <div className = "columns">
          <div className="column is-three-fifths is-offset-one-fifth">
              <br />
              <Link to="/" className="button is-primary">
                  Show Book List
              </Link>
              <br />
              <h1 className="subtitle is-3 has-text-centered">View Book Info</h1>
              <br />
              <div className="box">
              <div className="columns">
                <div className="column is-two-thirds">
                  { BookItem }
                </div>
                <div className="column is-one-third">
                <figure className="image is-3by4">
                  <img src= {book.avatar} alt="" /> </figure>
                </div>
                </div>
              </div>
            <div className="columns is-centred">
              <div className = "column has-text-centered is-half">
              <Link to={`/edit-book/${book._id}`} className="button is-info is-outlined is-fullwidth">
                      Edit Book
              </Link>
              </div>
              <div className = "column has-text-centered is-half">
                <button type="button" className="button is-danger is-outlined is-fullwidth" onClick={this.onDeleteClick.bind(this,book._id)}>Delete Book</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default showBookDetails;