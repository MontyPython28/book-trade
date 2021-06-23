import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import Header from "./Header";

export default function UpdateProfile() { //SOME PROBLEM W POST REQUEST RN
  const { currentUser, updatePassword } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [psword, setPsword] = useState("");
  const [pswordConfirm, setPswordConfirm] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const promises = [];
    setLoading(true);
    setError("");
    
    if (psword !== pswordConfirm) {
      return setError("Passwords do not match");
    } else {
      promises.push(updatePassword(psword));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <Header title="Update Profile"/>
      <div className="hero-body">
      <div className="container">
        <div className="column is-three-fifths is-offset-one-fifth">
          {error && <div className="notification is-danger is-light">{error}</div>}
          <h3 className="subtitle is-5">Email: {currentUser.email} </h3>
          <form onSubmit={handleSubmit}>
          <div className="box">
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input className="input" type="password" placeholder="********" 
                onChange={(event) => setPsword(event.target.value)} />
            </div>
          </div>
          <div className="field">
            <label className="label">Confirm Password</label>
            <div className="control">
              <input className="input" type="password" placeholder="********" 
                onChange={(event) => setPswordConfirm(event.target.value)} />
            </div>
          </div>
          </div>
          <button type="submit" className='button is-info is-medium is-outlined is-fullwidth'>
              Update
            </button>
        </form>
        </div>
      </div>
    </div>
    </div>
  )
}
