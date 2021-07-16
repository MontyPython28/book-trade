import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"
import axios from "axios";

const EditButtonTrio = (props) => {
  const { currentUser } = useAuth();

  const [soldButtonClass, setSoldButtonClass] = useState('button is-primary is-outlined is-fullwidth');
  const [deleteButtonClass, setDeleteButtonClass] = useState('button is-warning is-outlined is-fullwidth');

  const onDeleteClick = (id) => {
    setDeleteButtonClass('button is-warning is-medium is-outlined is-fullwidth is-loading')
    axios
      .delete(props.serverURL + '/api/books/'+ id)
      .then(res => {
        props.history.push("/");
      })
      .catch(err => {
        console.log("Error from ShowBookDetails_deleteClick");
        console.log(err);
      })
  };

  const onSubmit = e => {
    e.preventDefault();
    setSoldButtonClass('button is-primary is-medium is-outlined is-fullwidth is-loading');
    const data = {
      sold: true
    };

    axios
      .put(props.serverURL + '/api/books/' + props.id, data)
      .then(res => {
        props.history.push('/');
      })
      .catch(err => {
        console.log("Error from ShowBookDetails_onSubmit!");
      })
  };

  return currentUser && (props.email === currentUser.email)
  ? (
 <div className="columns is-centred">
    <div className = "column has-text-centered is-third">
    <Link to={`/edit-book/${props.id}`} className="button is-primary is-outlined is-fullwidth">
        Edit Book
    </Link>
    </div>
    <div className = "column has-text-centered is-third">
      <button type="button" className={soldButtonClass} onClick={onSubmit}>Mark as Sold</button>
    </div>
    <div className = "column has-text-centered is-third">
      <button type="button" className={deleteButtonClass} onClick={onDeleteClick.bind(this,props.id)}>Delete Permanently</button>
  </div>
</div>
    )
  : (<div></div>);
};

export default EditButtonTrio;