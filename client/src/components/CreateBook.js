import React, { Component } from 'react';
import '../App.css';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Header from './Header';

class CreateBook extends Component {
  serverURL = 'https://nusbooktrade.herokuapp.com'; //CHANGE
  // serverURL = 'http://localhost:4000';

  constructor() {
    super();
    this.state = {
      title: '',
      mcode:'',
      author:'',
      description:'',
      price:undefined,

      //for CSS of button
      buttonClass: 'button is-success is-medium is-outlined is-fullwidth',

      // for image uploading
      file: undefined,
      previewSrc: '',
      errorMsg : '', 
      isPreviewAvailable:false, 
      dropRef: React.createRef()
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    //for CSS of button
    this.setState({buttonClass: 'button is-success is-medium is-outlined is-fullwidth is-loading'});

    const data = new FormData();
    data.append('title', this.state.title);
    data.append('mcode', this.state.mcode);
    data.append('author', this.state.author);
    data.append('description', this.state.description);
    data.append('publisher', this.props.currentUser.email);
    data.append('price', this.state.price);
    data.append('sold', false);
    data.append('file', this.state.file); // for image

    axios
      .post(this.serverURL + '/api/books', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        } //changed for image
        // schema_version: 2
      })
      .then(res => {
        this.setState({
          title: '',
          mcode:'',
          author:'',
          description:'',
          price:0,
          file:null //changed for image
        })
        this.props.history.push('/');
      })
      .catch(err => {
        console.log('Error:', err);
      })
  };

  onDrop = (files) => {
    const [uploadedFile] = files;
    this.setState({file: uploadedFile});
  
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.setState({previewSrc: fileReader.result});
    };
    fileReader.readAsDataURL(uploadedFile);
    this.setState({isPreviewAvailable: uploadedFile.name.match(/\.(jpeg|jpg|png|JPEG|JPG|PNG)$/)});
  };

  render() {

    return this.state.previewSrc ? (
      <div>
      <Header title="Add Listing"/>
      <br />
        <div className="container">
        <div className = "columns">
          <div className="column is-10 is-offset-1">
            <form onSubmit={this.onSubmit}>
              <div className="columns">
              <div className="column is-one-third">
              <div className="box">
                <div className="field">
                  <label className="label"><p className="subtitle is-uppercase">Image</p></label>
              {this.state.previewSrc ? (
                    this.state.isPreviewAvailable ? (
                      <div className="card-image">
                      <figure className="image is-3by4">
                        <img src={this.state.previewSrc} alt="Preview" />
                      </figure>
                      </div>
                    ) : ( <p className="box has-text-danger has-text-weight-bold">No preview available for this file</p>)
                  ) : (<p></p>)
                  }
                <div className="control">
                  <Dropzone onDrop={this.onDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps({ className: 'drop-zone' })} ref={this.state.dropRef}>
                        <input className="input" {...getInputProps()} />
                        <p className='box'>
                          Drag and drop a file OR click here to select a file</p>
                        {this.state.file && (
                          <div>
                            <strong>Selected file:</strong> {this.state.file.name}
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>
                  </div>
                  
              </div>
                                    
            </div>
            </div>


              <div className="column is-two-thirds">
                <div className="box">
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
                    min='0' max='1000'
                    className='input is-success'
                    value={this.state.price}
                    onChange={this.onChange}
                  />
                </div>
              </div>             
              </div>  
            </div>
            </div>
                
              </div>
              <button type="submit" className={this.state.buttonClass}>
                Submit
              </button>
            </form>
          </div>
        </div>       
        </div>
      </div>
    )
    : (
      <div>
      <Header title="Add Listing"/>
      <br />
        <div className="container">
        <div className = "columns">
          <div className="column is-10 is-offset-1">
              <div className="box">
                <div className="field">
                      <div className="card-image has-text-centered">
                      </div>
                <div className="control">
                  <Dropzone onDrop={this.onDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps({ className: 'drop-zone' })} ref={this.state.dropRef}>
                        <input className="input" {...getInputProps()} />
                        <div className="column has-text-centered">
                <span className="icon-text is-large">
                  <span className="icon is-large has-text-link">
                  <i className="fas fa-3x fa-upload"></i>
                  </span>
                </span>
                <br />
                <br />
              <h1 className="subtitle is-4">Drag and Drop</h1>
              <h1 className="subtitle is-3"> OR </h1>
              <h1 className="subtitle is-4">click here to select a file </h1>
              <br />
            </div>
                      </div>
                    )}
                  </Dropzone>
                  </div>
                  
              </div>
                                    
            </div>
          </div>
        </div>       
        </div>
      </div>
    );
  }
}

export default CreateBook;