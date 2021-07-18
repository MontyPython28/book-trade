import React, {useState, useEffect} from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../App.css';
import axios from 'axios';

// "https://commapress.co.uk/books/the-book-of-cairo/cairo-provisional-v3/image%2Fspan3" original link for image
// "/images/BookShelf.PNG"

const ForumPost = (props) => {

   const serverURL = 'https://nusbooktrade.herokuapp.com'; //CHANGE
   // const serverURL = 'http://localhost:4000';

   const {currentUser} = useAuth();

   const [editMode, setEditMode] = useState(false);
   const [title, setTitle] = useState(props.post.title);
   const [description, setDescription] = useState(props.post.description);

   const [liked, setLiked] = useState(-1);
   const [likesNumber, setLikesNumber] = useState(props.post.usersLiked.length)

   useEffect(() => {
    if (currentUser ) { //&& (props.email !== currentUser.email)
      const webName = serverURL + '/api/posts/check-like/' + currentUser.email + '/' + props.post._id;
      axios.get(webName)
      .then(res => {
        setLiked(res.data.count)
      })
      .catch(err => console.log(err))
    }
  });

   const onSubmit = (e) => { //for the editing
    e.preventDefault();
    const data = {
        title: title,
        description: description
      };
    axios
    .put(serverURL + '/api/posts/' + props.post._id, data)
    .then(res => { window.location.reload(false); })
    .catch(err => { console.log("Error in ForumPost"); })  
   }

   const onDelete = (e) => {
    e.preventDefault(); 
    axios
    .delete(serverURL + '/api/posts/' + props.post._id)
    .then(res => { window.location.reload(false); })
    .catch(err => { console.log("Error in ForumPost"); })  
   }

   const like = (e) => {
    axios
    .post(serverURL + '/api/posts/add-like/' + currentUser.email + '/' + props.post._id)
    .then(res => { setLikesNumber(res.data.usersLiked.length); })
    .catch(err => {console.log("Error in ForumPost"); })  
   }

   const unLike = (e) => {
    axios
    .post(serverURL + '/api/posts/remove-like/' + currentUser.email + '/' + props.post._id)
    .then(res => { setLikesNumber(res.data.usersLiked.length); })
    .catch(err => { console.log("Error in ForumPost"); })  
   }

    return editMode ? (
        <form noValidate onSubmit={onSubmit} className="box">
            <div className="columns">
              <div className="column">
                <label className="label">Title: </label>
                <div className="control">
                  <input
                    type='text'
                    placeholder='Title of Post'
                    name='title'
                    className='input'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>
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
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>
              </div>
 
                <button type="submit" className='button is-success'>
                    Submit
                  </button>
              </form>
    )
    
    : (
        <div className="box">
        <article className="media">
            <figure className="media-left">
                <span className="icon is-large has-text-link">
                  <i className="fas fa-3x fa-user"></i>
                </span>    
            </figure>
            <div className="media-content">
              <div className="content">
                <div className="column is-three-quarters">
                    <p>
                        <strong className= "title is-5"> {props.post.title} </strong> <small>@{props.post.publisher}</small>
                        <br /> <strong className="has-text-danger">{ likesNumber} likes </strong>
                    </p>
                    <p className="has-text-primary">{props.post.description} </p>  
                </div>
              </div>
            </div>
              
            {currentUser ? (currentUser.email === props.post.publisher) ?
              (<div className="media-right has-text-right" >
                  <button className=" button level-right" onClick={() => setEditMode(!editMode)}> 
                    <i className="fas fa-pen"></i>
                  </button>
                  <button className=" button level-right" onClick={onDelete}> 
                    <i className="fas fa-trash"></i>
                  </button>
                </div>) : (liked === 0 ? (
                    <div className="media-right has-text-right">
                      <button className="button level-right" onClick={like}>
                          <span className="has-text-danger">
                              <i className="far fa-heart"></i>
                          </span>
                      </button>
                    </div>
                  ) : (liked === 1 ? (
                    <div className="media-right has-text-right">
                      <button className="button level-right" onClick={unLike}>
                          <span className="has-text-danger">
                              <i className="fas fa-heart"></i>
                          </span>
                      </button>
                    </div>
                  ) : (<div></div>)) )
            : (<div></div>)   }       
        </article>
        </div>
    )
};

export default ForumPost;