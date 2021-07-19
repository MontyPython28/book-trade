import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext"
import axios from "axios";

const WishlistButton = (props) => {
  const { currentUser } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("");

  const [wishlisted, setWishlisted] = useState(-1);

  useEffect(() => {
    if (currentUser && (props.email !== currentUser.email)) {
      const webName = props.serverURL + '/check-wishlist/' + props.id + '/' + currentUser.email;
      axios.get(webName)
      .then(res => {
        setWishlisted(res.data.count)
      })
      .catch(err => console.log(err))
    }
  });
  

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }

  const [WishlistButtonClass, setWishlistButtonClass] = useState('button is-success is-outlined is-fullwidth');

  const wishList = (event) => {
    event.preventDefault();
    setWishlistButtonClass('button is-success is-medium is-outlined is-fullwidth is-loading');
    const data = {
      book_id: props.id
    };

    axios
      .post(props.serverURL + '/add-to-wishlist/' + currentUser.email, data)
      .then(async (res) => {
        setSuccess('Adding to wishlist...');
        await timeout(5000);
        history.push(location.pathname);
      })
      .catch(err => {
        setError(err.message);
      }).finally(() => {
        setSuccess('')
        setWishlistButtonClass('button is-warning is-outlined is-fullwidth');
      });
  };

  const unWishList = (event) => {
    event.preventDefault();
    setWishlistButtonClass('button is-success is-medium is-outlined is-fullwidth is-loading');
    const data = {
      book_id: props.id
    };

    axios
      .post(props.serverURL + '/remove-from-wishlist/' + currentUser.email, data)
      .then(async (res) => {
        setSuccess('Removing from wishlist...');
        await timeout(5000);
        history.push(location.pathname);
      })
      .catch(err => {
        setError(err.message);
      }).finally(() => {
        setSuccess('')
        setWishlistButtonClass('button is-warning is-outlined is-fullwidth');
      });
  };


  return currentUser && (props.email !== currentUser.email)
  ? (
    <div className="is-centred">
        {wishlisted === 0 ? (
        <div className = "column has-text-centered is-third">
            <button type="button" className={WishlistButtonClass} 
              onClick={wishList}>Wishlist this book</button>
        </div>) : (wishlisted === 1 ? (
          <div className = "column has-text-centered is-third">
            <button type="button" className={WishlistButtonClass} 
              onClick={unWishList}>Remove from Wishlist</button>
        </div>) : (<div></div>)) }
        {error && <div className="notification is-danger is-light">{error}</div>}
        {success && <div className="notification is-success is-light">{success}</div>}
    </div>
  ) : ( <div></div>);
};

export default WishlistButton;