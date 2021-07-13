import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext"
import axios from "axios";


const WishlistButton = (props) => {
  const { currentUser } = useAuth();
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("");

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }

  const [WishlistButtonClass, setWishlistButtonClass] = useState('button is-warning is-outlined is-fullwidth');

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(props.serverURL)
    setWishlistButtonClass('button is-warning is-medium is-outlined is-fullwidth is-loading');
    const data = {
      book_title: props.title,
      seller: props.email
    };

    axios
      .post(props.serverURL + '/buy/' + currentUser.email, data)
      .then(async (res) => {
        setSuccess('Find the book in your negotiations! Redirecting to homepage...');
        await timeout(5000);
        props.history.push('/');
      })
      .catch(err => {
        setError(err.message);
      }).finally(() => {
        setWishlistButtonClass('button is-warning is-outlined is-fullwidth');
      });
  };


  return currentUser && (props.email === currentUser.email)
  ? (
        <div></div>
    )
  : (
    <div className="is-centred">
        <div className = "column has-text-centered is-third">
            <button type="button" className={WishlistButtonClass} onClick={onSubmit}>Buy this book</button>
        </div>
        {error && <div className="notification is-danger is-light">{error}</div>}
        {success && <div className="notification is-success is-light">{success}</div>}
    </div>
  );
};

export default WishlistButton;