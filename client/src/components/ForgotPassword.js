import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      const withExtension = email + '@u.nus.edu';
      await resetPassword(withExtension);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <div className="hero-body">
      <div className="container">
        <div className="column is-4 is-offset-4">
          <h3 className="title is-3 has-text-centered has-text-black"> Reset Password </h3>
          {error && <div className="notification is-danger is-light">{error}</div>}
          {message && <div className="notification is-success is-light">{message}</div>}
          
          <form className="box" onSubmit={handleSubmit}>
            <div className="field">
            <label className="label">NUSNET ID</label>
            <div className="control">
              <input className="input" type="text" placeholder="EXXXXXXX" 
              onChange={(event) => setEmail(event.target.value)} />
            </div>
          </div>
          <button className="button is-primary" type="submit" disabled={loading}>
          <span className="icon is-small">
            <i className="fas fa-key"></i>
            </span>
            <span>Reset</span>
          </button>
        </form>

        <div className="has-text-centered">
          <Link to="/login">Login</Link>
        </div>
        <div className="has-text-centered">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
        </div>
      </div>
    </div>
  )
}
