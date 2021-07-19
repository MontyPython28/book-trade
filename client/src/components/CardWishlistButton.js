import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"
import axios from "axios";

const CardWishlistButton = (props) => {
  const { currentUser } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const [error, setError] = useState("")

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

  const wishList = (event) => {
    event.preventDefault();
    const data = {
      book_id: props.id
    };

    axios
      .post(props.serverURL + '/add-to-wishlist/' + currentUser.email, data)
      .then(async (res) => {
        history.push(location.pathname);
      })
      .catch(err => {
        setError(err.message);
      })
  };

  const unWishList = (event) => {
    event.preventDefault();
    const data = {
      book_id: props.id
    };

    axios
      .post(props.serverURL + '/remove-from-wishlist/' + currentUser.email, data)
      .then(async (res) => {
        history.push(location.pathname);
      })
      .catch(err => {
        setError(err.message);
      })
  };


  return currentUser
  ? (
    <div className="level">
        {(wishlisted === 0 && props.email !== currentUser.email)? (
            <div type="button" onClick={wishList}>
                <span className="icon has-text-danger">
                    <i className="far fa-bookmark"></i>
                </span>
            </div>
        ) : (wishlisted === 1 && props.email !== currentUser.email)? (
            <div type="button" onClick={unWishList}>
                <span className="icon has-text-danger">
                    <i className="fas fa-bookmark"></i>
                </span>
            </div>
        ) : (<div></div>)}
        {error && <div className="notification is-danger is-light">{error}</div>}
    </div>
  ) : ( <Link to="/login">
          <span className="icon has-text-danger">
              <i className="far fa-bookmark"></i>
          </span>
        </Link>);
};

export default CardWishlistButton;