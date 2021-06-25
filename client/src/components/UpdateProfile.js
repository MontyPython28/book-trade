import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import axios from 'axios'

export default function UpdateProfile() { 
  const serverURL = 'http://localhost:4000';
  const { currentUser } = useAuth()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [username, setUsername] = useState("");
  const [aboutme, setAboutme] = useState("");
  const [user, setUser] = useState({username: 'client-generic', aboutme: 'client-generic'});

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }

  function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");
    
    const data = {
        user_email: currentUser.email,
        username: username,
        aboutme: aboutme
    };

    axios
      .put(serverURL + '/update-user/' + currentUser.email, data)
      .then(async () => {
        setSuccess('User updated! Redirecting to homepage...');
        await timeout(5000); 
        history.push("/");
      })
      .catch(err => {
        setError(err.message);
      }).finally(() => {
        setLoading(false)
      });
    
  }

  const fetchData = async () => {
    await axios({
      "method": "GET",
      "url": serverURL + '/user-details/' + currentUser.email  
    })
    .then((response) => {
      setUser(response.data);
      
    })
    .catch((error) => {
      console.log(error)
    });
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <Header title="Update Profile"/>
      <div className="hero-body">
      <div className="container">
        <div className="column is-three-fifths is-offset-one-fifth">
          {error && <div className="notification is-danger is-light">{error}</div>}
          {success && <div className="notification is-success is-light">{success}</div>}
          <h3 className="subtitle is-5">Email: {currentUser.email} </h3>
          <form onSubmit={handleSubmit}>
          <div className="box">
          
          <div className="field">
            <label className="label">Enter username</label>
            <div className="control">
              <input className="input" type="text" placeholder={user.username}
                onChange={(event) => setUsername(event.target.value)} />
            </div>
          </div>

          <div className="field">
            <label className="label">About me</label>
            <div className="control">
              <input className="input" type="text" placeholder={user.aboutme}
                onChange={(event) => setAboutme(event.target.value)} />
            </div>
          </div>
          </div>
          <button disabled={loading} type="submit" className='button is-info is-medium is-outlined is-fullwidth'>
              Update
            </button>
        </form>
        </div>
      </div>
    </div>
    </div>
  )
}
