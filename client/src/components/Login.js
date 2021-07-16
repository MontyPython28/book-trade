import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Login() {

  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [psword, setPsword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("fas fa-eye");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(username, psword);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false)
  }

  const changeVisibility = () => {
    if (type === "password") {
      setIcon("fas fa-eye-slash");
      setType("text");
    } else {
      setIcon("fas fa-eye");
      setType("password");
    }
  }

  // 
  return (
    <div className="hero-body">
      <div className="container">
        <div className="column is-4 is-offset-4">
          <h3 className="title is-3 has-text-centered has-text-white"> Login </h3>
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
            <div className="control has-icons-right">
              <span className="icon is-small is-right is-clickable">
              <i className={icon}
                  onClick={changeVisibility}></i>
              </span>
              <input className="input" type={type} placeholder="********" 
                onChange={(event) => setPsword(event.target.value)} />
            </div>
          </div>
          <button className="button is-primary" type="submit" disabled={loading}>
          <span className="icon is-small">
            <i className="fas fa-sign-in-alt"></i>
            </span>
            <span>Login</span>
          </button>
        </form>

        <div className="has-text-centered">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <div className="has-text-centered has-text-white">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
        </div>
      </div>
    </div>
  )
}
