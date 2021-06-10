import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Dropzone from 'react-dropzone';
import axios from 'axios';


class CreateBook extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      isbn:'',
      author:'',
      description:'',
      publisher:'',

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

  onSubmit = e => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', this.state.title);
    data.append('isbn', this.state.isbn);
    data.append('author', this.state.author);
    data.append('description', this.state.description);
    data.append('publisher', this.state.publisher);
    data.append('file', this.state.file); // for image

    axios
      .post('http://localhost:8082/api/books', data, {
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
        console.log('Error:', err.response.data);
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
      <div className="CreateBoo">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="button is-primary float-left">
                  Show Book List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="subtitle is-3 has-text-centered">Create Book</h1>

              <form noValidate onSubmit={this.onSubmit}>
              <div class="field">
                <label class="label">Title</label>
                  <div class="control">
                  <input
                    type='text'
                    placeholder='Title of the Book'
                    name='title'
                    className='form-control'
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                  </div>
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Module Code'
                    name='isbn'
                    className='form-control'
                    value={this.state.isbn}
                    onChange={this.onChange}
                  />
                </div>

                <br />

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Author'
                    name='author'
                    className='form-control'
                    value={this.state.author}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Describe this book'
                    name='description'
                    className='form-control'
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Images'
                    name='publisher'
                    className='form-control'
                    value={this.state.publisher}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-control">
                  <Dropzone onDrop={this.onDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps({ className: 'drop-zone' })} ref={this.state.dropRef}>
                        <input {...getInputProps()} />
                        <p className='form-control'>Drag and drop a file OR click here to select a file</p>
                        {this.state.file && (
                          <div>
                            <strong>Selected file:</strong> {this.state.file.name}
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>
                  {this.state.previewSrc ? (
                    this.state.isPreviewAvailable ? (
                      <div className="card-image">
                      <figure class="image is-3by4">
                        <img src={this.state.previewSrc} alt="Preview" />
                      </figure>
                      </div>
                    ) : ( <p className="preview-message">No preview available for this file</p>)
                  ) : (<p className="preview-message">Image preview will be shown here after selection</p>)
                  }
                </div>
                
                <input
                    type="submit"
                    className="button is-success is-medium is-outlined fa-align-center"
                />
              </form>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateBook;