import React, { useState }  from 'react';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import '../App.css';

const Header = (props) => {

    const [searchInput, setSearchInput] = useState('');

    return(
      <div>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <img src="/images/Logo.png" width="170" height="40" alt="Logo"/>
            </Link>
            <div className="nav-bar item">
            <input className="input" type="search" placeholder="Search"
              onChange={(event) => setSearchInput(event.target.value)}
            />
            </div>

            <div className="nav-bar item">
            <Link to={`/search/${searchInput}`} className="button is-primary">
              Search
            </Link>
            </div>
            <div role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </div>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <Link to="/" className="navbar-item">
                Home
              </Link>
              <Link to="/create-book" className="navbar-item">
                Add Book
              </Link>
              <Link to='/wishlist' className="navbar-item" >
                My Wishlist
              </Link>
            </div>

            <div className="navbar-end">
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
                  <Link to='./listing' className="navbar-item">
                    My Listings
                  </Link>
                  <div className="navbar-item">
                    My History
                  </div>
                </div>
              </div>

              <div className="navbar-item">
                  <LoginButton />
              </div>
            </div>
          </div>
        </nav> 

        <h2 className="title is-2  has-text-centered">{props.title}</h2>
        </div>
     
    )
};

export default Header;