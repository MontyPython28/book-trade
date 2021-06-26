import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Header from './Header';
import EditButtonTrio from './EditButtonTrio';
import WishlistButton from './WishlistButton';
import UnwishlistButton from './UnwishlistButton';


class showBookDetails extends Component {
  serverURL = 'http://localhost:4000';
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      mcode: '',
      author: '',
      description: '',
      publisher: '',
      price: '',
      wishlisted: 0
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
        axios({
          "method": "GET",
          "url": this.serverURL + '/check-wishlist/' + this.state.title + '/' + this.props.currentUser.email 
        })
        .then((res) => {
          this.setState({
            wishlisted: res.data.count
          });
          console.log(this.state.wishlisted)
        })
        .catch((error) => {
          console.log(error)
        });
        console.log(this.state.book.price.$numberDecimal);
      })
      .catch(err => {
        console.log(err);
      })
    
  };

  onDeleteClick (id) {
    axios
      .delete(this.serverURL + '/api/books/'+ id)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("Error form ShowBookDetails_deleteClick");
        console.log(err);
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
            <td className="is-family-primary">{ book.title }</td>
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
            <EditButtonTrio email={book.publisher} id={book._id} serverURL={this.serverURL} history={this.props.history}/>
            { this.state.wishlisted > 0
              ? <UnwishlistButton email={book.publisher} title={book.title} serverURL={this.serverURL} history={this.props.history}/>
              : <WishlistButton email={book.publisher} title={book.title} serverURL={this.serverURL} history={this.props.history}/>
            }
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default showBookDetails;