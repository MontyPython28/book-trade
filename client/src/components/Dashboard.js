import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Header from "./Header";;

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  const ProfileInfo = <div>
  <table className="table is-bordered is-striped">
    <tbody>
      <tr>
        <th>Email</th>
        <td>{currentUser.email}</td>
      </tr>
    </tbody>
    </table>
    </div>;

  return (
    <>
      <Header title="My Profile" />
      <br />
      <div className="container">
        <div className = "columns">
          <div className="column is-three-fifths is-offset-one-fifth">
              {error && <div className="notification is-danger is-light">{error}</div>}
              <div className="box">
              <div className="columns">
                <div className="column is-two-thirds">
                    { ProfileInfo }
                </div>
              </div>
            </div>        
          <div className="columns is-centred">
              <div className = "column has-text-centered is-one-third">
              <Link to= "/update-password"className="button is-info is-outlined is-fullwidth">
                Update Password
              </Link>
              </div>
              <div className = "column has-text-centered is-one-third">
              <Link to= "/update-profile" className="button is-info is-outlined is-fullwidth">
                Update Profile
              </Link>
              </div>
              <div className = "column has-text-centered is-one-third">
                <button type="button" className="button is-dark is-outlined is-fullwidth" onClick={handleLogout}>Log Out</button>
            </div>
          </div>
      </div>
      </div>
      </div>
    </>
  )
}
