import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"

const LoginButton = () => {
  const { currentUser, logout } = useAuth();

  return currentUser
  ? (<button className="button is-primary" onClick={() => logout({ returnTo: window.location.origin })}>
    Log Out
  </button>)
  : (<Link to="/login" className="button is-light">Log In/Sign Up</Link>);
};

export default LoginButton;