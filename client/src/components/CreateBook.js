import React, { Component } from 'react';
import '../App.css';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Header from './Header';


class CreateBook extends Component {
  // serverURL = 'https://nusbooktrade.herokuapp.com'; //CHANGE
  serverURL = 'http://localhost:4000'
  constructor() {
    super();
    this.state = {
      title: '',
      isbn:'',
      author:'',
      description:'',
      publisher:'',

      //for CSS of button
      buttonClass: 'button is-success is-medium is-outlined is-fullwidth',

      // for image uploading
      file: null,
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
    data.append('isbn', this.state.isbn);
    data.append('author', this.state.author);
    data.append('description', this.state.description);
    data.append('publisher', this.state.publisher);
    data.append('file', this.state.file); // for image

    axios
      .post(this.serverURL + '/api/books', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        } //changed for image
      }) //ADD http://localhost:8082 when developing (same for all other axios requests)
      .then(res => {
        this.setState({
          title: '',
          isbn:'',
          author:'',
          description:'',
          publisher:'',
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
    this.setState({isPreviewAvailable: uploadedFile.name.match(/\.(jpeg|jpg|png)$/)});
  };

  render() {
    return (
      <div>
      <Header title="Add Book" />
        <div className="container">
        <div className="columns">
          <div className="column is-three-fifths is-offset-one-fifth">

            <form noValidate onSubmit={this.onSubmit}>
            <div className="box">
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

              <div className="field">
                <label className="label">Image</label>
                <div className="control">
                  <Dropzone onDrop={this.onDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps({ className: 'drop-zone' })} ref={this.state.dropRef}>
                        <input className="input" {...getInputProps()} />
                        <p className='input is-focused'>Drag and drop a file OR click here to select a file</p>
                        {this.state.file && (
                          <div>
                            <strong>Selected file:</strong> {this.state.file.name}
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>
                  </div>
                  {this.state.previewSrc ? (
                    this.state.isPreviewAvailable ? (
                      <div className="card-image">
                      <figure className="image is-3by4">
                        <img src={this.state.previewSrc} alt="Preview" />
                      </figure>
                      </div>
                    ) : ( <p className="box has-text-danger has-text-weight-bold">No preview available for this file</p>)
                  ) : (<p className="box">Image preview will be shown here after selection</p>)
                  }
              </div>
              </div>  
              <br />
                <button type="submit" className={this.state.buttonClass}>
                    Submit
                  </button>
              </form>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default CreateBook;