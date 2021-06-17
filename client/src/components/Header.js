import React, { useState }  from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Header = (props) => {

    const [searchInput, setSearchInput] = useState('');

    return(
        <div className="container">
          <br />
          <div className="columns">
          <div className="column has-background-info is-focused">
            <h2 className="title is-1 has-text-white">Hello, Username</h2>
            <h2 className="subtitle is-3 has-text-light">Welcome to Booktrade!</h2>
          </div>
        </div>
        
        <div className="level" role="navigation" aria-label="main navigation">
            <div className="level-left">
          
          <input className="input level-item" type="search" placeholder="Search for book here"
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <Link to={`/search/${searchInput}`} className="button is-primary level-item">
            Search
          </Link>

          <Link to="/" className="nav-item level-item">
            Home
          </Link>
          <Link to="/create-book" className="nav-item level-item">
            Add New Book
          </Link>
          </div>
        </div>
      </div>
    )
};

export default Header;