import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import Header from "./Header";

export default function UpdatePswd() { 
  const { currentUser, updatePassword, reAuthUser } = useAuth()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [currentpsword, setCurrentpsword] = useState("");
  const [psword, setPsword] = useState("");
  const [pswordConfirm, setPswordConfirm] = useState("");

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }

  function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");
    
    if (psword !== pswordConfirm) {
      return setError("Passwords do not match");
    } else {
      reAuthUser(currentpsword).then(() => {
        updatePassword(psword).then(async () => {
          setSuccess('password has been reset! Redirecting to homepage...');
          await timeout(5000); 
          history.push("/")
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false)
        })
      }).catch((error) => {
        setError(error.message);
      }).finally(() => {
        setLoading(false)
      });
    }
  }

  return (
    <div>
      <Header title="Update Password"/>
      <div className="container">
        <div className="column is-4 is-offset-4">
          {error && <div className="notification is-danger is-light">{error}</div>}
          {success && <div className="notification is-success is-light">{success}</div>}
          <h3 className="subtitle is-5 has-text-centered"> {currentUser.email} </h3>
          <form onSubmit={handleSubmit}>
          <div className="box">
          
          <div className="field">
            <label className="label">Enter current password</label>
            <div className="control">
              <input className="input" type="password" placeholder="********" 
                onChange={(event) => setCurrentpsword(event.target.value)} />
            </div>
          </div>

          <div className="field">
            <label className="label">New Password</label>
            <div className="control">
              <input className="input" type="password" placeholder="********" 
                onChange={(event) => setPsword(event.target.value)} />
            </div>
          </div>
          
          <div className="field">
            <label className="label">Confirm New Password</label>
            <div className="control">
              <input className="input" type="password" placeholder="********" 
                onChange={(event) => setPswordConfirm(event.target.value)} />
            </div>
          </div>
          </div>
          <button disabled={loading} type="submit" className='button is-primary is-medium is-outlined is-fullwidth'>
              Update
            </button>
        </form>
        </div>
      </div>
    </div>
  )
}
