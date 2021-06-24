import React, { useContext, useState, useEffect } from "react"
import { auth, cred } from "../firebase"
import Axios from 'axios';


const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  async function signup(NUSNETid, password) {
    const serverURL = 'http://localhost:4000' 
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
    reAuthUser
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
