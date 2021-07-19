import React, { useContext, useState, useEffect } from "react"
import { auth, cred } from "../firebase"
import Axios from 'axios';


const Context = React.createContext()

export function useAuth() {
  return useContext(Context)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const MyProjectID = "3c754052-bcc6-42db-9d93-96101a0be664"
  const [chatConfig, setChatConfig] = useState();

  
  async function signup(NUSNETid, password) {
    const serverURL = 'https://nusbooktrade.herokuapp.com'; //CHANGE
    //const serverURL = 'http://localhost:4000'; 
    const email = NUSNETid + '@u.nus.edu';

    await Axios({
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      data: {
          userEmail: email,
          password: password
      },
      withCredentials: true,
      url: serverURL + '/send-confirmation-email',
    });

    //return auth.createUserWithEmailAndPassword(email, password)

  }

  function login(NUSNETid, password) {
    const email = NUSNETid + '@u.nus.edu';
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  function reAuthUser(password) {
    const credentials = cred.credential(currentUser.email, password);
    return currentUser.reauthenticateWithCredential(credentials);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user)
      {
        setChatConfig({
        userSecret: 'random',
        userName: user.email,
        projectID: MyProjectID
        });
      }
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updatePassword,
    reAuthUser,
    chatConfig
  }

  return (
    <Context.Provider value={value}>
      {!loading && children}
    </Context.Provider>
  )
}
