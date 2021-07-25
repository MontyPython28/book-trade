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
          <div className="level-left">
            <div className="level-item">
              <div type="button" onClick={wishList}>
                  <span className="icon has-text-danger">
                      <i className="far fa-lg fa-heart"></i>
                  </span>
              </div>
            </div>
            <div className="level-item">
              <div className="subtitle is-7">Add to Wishlist</div>
            </div>
          </div>
        ) : (wishlisted === 1 && props.email !== currentUser.email)? (
          <div className="level-left">
            <div className="level-item">
              <div type="button" onClick={unWishList}>
                  <span className="icon has-text-danger">
                      <i className="fas fa-lg fa-heart"></i>
                  </span>
              </div>
            </div>
            <div className="level-item">
              <div className="subtitle is-7">Remove from Wishlist</div>
            </div>
          </div>
        ) : (<div></div>)}
        {error && <div className="notification is-danger is-light">{error}</div>}
    </div>
  ) : ( <Link to="/login">
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <div type="button">
                  <span className="icon has-text-danger">
                      <i className="far fa-lg fa-heart"></i>
                  </span>
              </div>
            </div>
            <div className="level-item">
              <div className="subtitle is-7">Add to Wishlist</div>
            </div>
          </div>
        </div>
        </Link>);
};

export default CardWishlistButton;