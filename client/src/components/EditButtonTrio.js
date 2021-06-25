import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"
import axios from "axios";

const EditButtonTrio = (props) => {
  const { currentUser } = useAuth();

  const onDeleteClick = (id) => {
    axios
      .delete(props.serverURL + '/api/books/'+ id)
      .then(res => {
        props.history.push("/");
      })
      .catch(err => {
        console.log("Error form ShowBookDetails_deleteClick");
        console.log(err);
      })
  };

  return currentUser && (props.email == currentUser.email)
  ? (
 <div className="columns is-centred">
    <div className = "column has-text-centered is-third">
    <Link to={`/edit-book/${props.id}`} className="button is-info is-outlined is-fullwidth">
        Edit Book
    </Link>
    </div>
    <div className = "column has-text-centered is-third">
      <button type="button" className="button is-warning is-outlined is-fullwidth">Mark as Sold</button>
    </div>
    <div className = "column has-text-centered is-third">
      <button type="button" className="button is-danger is-outlined is-fullwidth" onClick={onDeleteClick.bind(this,props.id)}>Delete Permanently</button>
  </div>
</div>
    )
  : (<div></div>);
};

export default EditButtonTrio;