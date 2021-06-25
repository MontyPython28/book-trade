import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import Header from './Header';


class showBookDetails extends Component {
  //serverURL = 'https://nusbooktrade.herokuapp.com'; //CHANGE
  serverURL = 'http://localhost:4000' 
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      mcode: '',
      author: '',
      description: '',
      publisher: '',
      price: '',
    };
  }

  componentDidMount() {
    console.log("Print id: " + this.props.match.params.id);
    axios
      .get(this.serverURL + '/api/books/' + this.props.match.params.id)
      .then(res => {
        console.log("Print-showBookDetails-API-response: " + res.data);
        this.setState({
            _id: res.data._id,
            title: res.data.title,
            mcode: res.data.mcode,
            author: res.data.author,
            description: res.data.description,
            publisher: res.data.publisher,
            price: res.data.price.$numberDecimal,
            avatar: res.data.avatar
        });
        console.log(this.state.book.price.$numberDecimal);
      })
      .catch(err => {
        console.log(err);
      })
    
  };

  onDeleteClick (id) {
    console.log(this.serverURL + '/api/books/'+ id);
    axios
      .delete(this.serverURL + '/api/books/'+ id)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("Error form ShowBookDetails_deleteClick");
      })
  };


  render() {
    
    const book = this.state;

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
            <td>{ book.mcode }</td>
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
            <td>{ book.price }</td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>Seller</td>
            <td>{ book.publisher }</td>
          </tr>
        </tbody>
      </table>
    </div>

    return (
      <div>
        <Header title="View Book Info" />
        <div className="container">
        <div className = "columns">
          <div className="column is-three-fifths is-offset-one-fifth">
              
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
              <div className = "column has-text-centered is-third">
              <Link to={`/edit-book/${book._id}`} className="button is-info is-outlined is-fullwidth">
                  Edit Book
              </Link>
              </div>
              <div className = "column has-text-centered is-third">
                <button type="button" className="button is-warning is-outlined is-fullwidth">Mark as Sold</button>
              </div>
              <div className = "column has-text-centered is-third">
                <button type="button" className="button is-danger is-outlined is-fullwidth" onClick={this.onDeleteClick.bind(this,book._id)}>Delete Book</button>
            </div>
          </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default showBookDetails;