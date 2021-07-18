import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Signup() {
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [psword, setPsword] = useState("");
  const [pswordConfirm, setPswordConfirm] = useState("");


  async function handleSubmit(e) {
    e.preventDefault();

    if (psword !== pswordConfirm) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(username.toLowerCase(), psword);
      history.push("/wait");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <div className="hero-body">
      <div className="container">
        <div className="column is-4 is-offset-4">
          <h3 className="title is-3 has-text-centered has-text-white"> Sign Up </h3>
          {error && <div className="notification is-danger is-light">{error}</div>}
          

          <form className="box" onSubmit={handleSubmit}>
            <div className="field">
            <label className="label">
            <p className="subtitle">NUSNET ID</p></label>
            <div className="control">
              <input className="input" type="text" placeholder="EXXXXXXX" 
              onChange={(event) => setUsername(event.target.value)} />
            </div>
          </div>
          <div className="field">
            <label className="label">
              <p className="subtitle">Password</p></label>
            <div className="control">
              <input className="input" type="password" placeholder="********" 
                onChange={(event) => setPsword(event.target.value)} />
            </div>
          </div>
          <div className="field">
            <label className="label">
            <p className="subtitle">Confirm Password</p></label>
            <div className="control">
              <input className="input" type="password" placeholder="********" 
                onChange={(event) => setPswordConfirm(event.target.value)} />
            </div>
          </div>
          <button className="button is-primary" type="submit" disabled={loading}>
          <span className="icon is-small">
            <i className="fas fa-user-plus"></i>
            </span>
            <span>Sign Up</span>
          </button>
        </form>

        <div className="has-text-centered has-text-white">
          Already have an account? <Link to="/login">Login</Link>
        </div>
        </div>
      </div>
    </div>
  )
}
