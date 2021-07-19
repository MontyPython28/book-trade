import React, { useState }  from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginButton from './LoginButton';
import '../App.css';

const Header = (props) => {
    const {currentUser} = useAuth();

    const [searchInput, setSearchInput] = useState('');
    const [isActive, setisActive] = useState(false);
    const history = useHistory();

    const handleKeyDown = e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        history.push('/search/' + searchInput);
      }
    }

    return(
      <div>
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">

          <div onClick={() => {setisActive(!isActive)}}
                 role="button" className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
                 aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </div>
            <Link to="/" className="nav-bar item">
              <img src="/images/LogoSide.png" width="200" height="50" alt="Logo"/>
            </Link>
            <div className="nav-bar item">
            <input className="input is-rounded mt-1" type="search" placeholder="Search"
              onChange={(event) => setSearchInput(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            </div>
            
          </div>

          <div id="navbarBasicExample" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
            <div className="navbar-start"> </div>

            <div className="navbar-end">

            <Link to={currentUser ? "/create-book" : "/login"} className="navbar-item ">
                <p className="title is-6 has-text-link">ADD LISTING</p>
              </Link>)
              <Link to="/all-books" className="navbar-item ">
                <p className="title is-6 has-text-link">ALL BOOKS</p>
              </Link>
              <Link to="/forum-threads" className="navbar-item ">
                <p className="title is-6 has-text-link">FORUM</p>
              </Link>

              {currentUser ?  (
              <div className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-link">
                <span className="icon">
                  <i className="fas fa-user"></i>
                </span>
                </div>
                <div className="navbar-dropdown">
                  <Link to="/dashboard" className="navbar-item">
                    My Profile
                  </Link>
                  <Link to='/wishlist' className="navbar-item" >
                    My Wishlist
                  </Link>
                  <Link to='/listing' className="navbar-item">
                    My Listings
                  </Link>
                  <Link to='/my-posts' className="navbar-item">
                    My Posts
                  </Link>
                </div>
              </div>) : (<div></div>) }

              <div className="navbar-item">
                  <LoginButton />
              </div>
            </div>
          </div>
        </nav>
        <br />
        <div className="title has-text-centered has-text-white">{props.title}</div>
      </div>      
    )
};

export default Header;