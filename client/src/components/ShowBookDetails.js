import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import Header from './Header';
import EditButtonTrio from './EditButtonTrio';
import WishlistButton from './WishlistButton';
import Accordion from './Accordion';
import StartChat from './chat/StartChat';

class showBookDetails extends Component {
  serverURL = 'https://nusbooktrade.herokuapp.com'; //CHANGE
  // serverURL = 'http://localhost:4000';
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      mcode: '',
      author: '',
      description: '',
      publisher: '',
      price: '',
      wishlisted: -1,
      sold: false,

      threads: [],
      setUp: false
    };
  }

  componentDidMount() {
    axios
      .get(this.serverURL + '/api/books/' + this.props.match.params.id)
      .then(res => {
        this.setState({
            _id: res.data._id,
            title: res.data.title,
            mcode: res.data.mcode,
            author: res.data.author,
            description: res.data.description,
            publisher: res.data.publisher,
            price: res.data.price.$numberDecimal,
            sold: res.data.sold,
            avatar: res.data.avatar
        });
      })
      .then( x => {
        axios
          .get(this.serverURL + '/api/threads/' + this.state.mcode.toUpperCase() + '/mcode')
          .then(res => this.setState({threads: res.data}));
          this.setState({setUp: true});
      })
      .catch((error) => {
        console.log(error)
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
      <table className="table is-bordered is-striped is-fullwidth">
        <tbody>
          <tr>
            <th scope="row">Title</th>
            <td className="is-family-primary">{ book.title }</td>
          </tr>
          <tr>
            <th scope="row">Module Code</th>
            <td>{ book.mcode }</td>
          </tr>
          <tr>
            <th scope="row">Author</th>
            <td>{ book.author }</td>
          </tr>
          <tr>
            <th scope="row">Additional Details</th>
            <td>{ book.description }</td>
          </tr>
          <tr>
            <th scope="row">Price (SGD)</th>
            <td>{ book.price }</td>
          </tr>
          <tr>
            <th scope="row">Seller</th>
            <td>{ book.publisher }</td>
          </tr>
        </tbody>
      </table>
    </div>

    let moduleList = this.state.threads.map(
      thread => <li>
        <Link to={`/forum/${thread._id}`} >{thread.title}</Link>
      </li>);

    console.log(book.sold);

    return this.state.setUp ? (
      <div>
        <Header title={book.title} />
        <br />
        <div className="container">
        <div className = "columns">
          <div className="column is-three-fifths is-offset-one-fifth">
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
            <EditButtonTrio email={book.publisher} id={book._id} sold={book.sold} serverURL={this.serverURL} history={this.props.history}/>
            <div className="columns">
              <div className="column"><WishlistButton email={book.publisher} id={book._id} serverURL={this.serverURL}/></div>
              <div className="column"><StartChat  title={book.title} id={book._id} seller={book.publisher} history={this.props.history}/></div>
            </div>
            
            
            <Accordion title="Related Forum Threads: ">
              <div className="content"> 
              {moduleList.length <= 0 ? (<p>There are no books associated with this module</p>)
              : (<ul> {moduleList} </ul>)} 
              </div>
            </Accordion>            
          </div>
        </div>
        </div>
      </div>
    ) : <Header title={book.title} /> ;
  }
}

export default showBookDetails;