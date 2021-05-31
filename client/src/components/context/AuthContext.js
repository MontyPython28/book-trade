import React, { useEffect, useState, useContext } from 'react';
import Axios from 'axios';


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loggedin, setLoggedin] = useState(false);
    const serverURL = 'http://localhost:4000';

    async function signup(email, password) {
        const res = await Axios({
            method: "POST",
            data: {
                username: email,
                password: password,
            },
            withCredentials: true,
            url: serverURL + '/register',
        });
        
        if(res.data.signupAttempt) {
            setCurrentUser(res.data.userId);
            setLoggedin(true);
            console.log(currentUser + 'signed up and logged in');
        } else throw new Error("signup failed");
    };

    async function login(email, password) {
        
        const res = await Axios({
            method: "POST",
            data: {
                username: email,
                password: password,
            },
            withCredentials: true,
            url: serverURL + '/login',
        });
        
        if(res.data.loginAttempt) {
            setCurrentUser(res.data.userId);
            setLoggedin(true);
            console.log(currentUser + 'logged in');
        } else throw new Error("login failed");      

    };

    async function logout() {
        const res = await Axios({
            method: "GET",
            withCredentials: true,
            url: serverURL + '/logout',
        });
        
        setLoggedin(false)
        console.log(res + 'logged out');
    };

    async function getUser() {
        const res = await  Axios({
            method: "GET",
            withCredentials: true,
            url: serverURL + '/user',
          });
        
        setCurrentUser(res.data);
        console.log('current user: ' + res.data);
    };

    useEffect(() => {
        if(loggedin) getUser()
        setLoading(false);
    }, [])
    

    const value = {
        loggedin,
        currentUser,
        signup,
        login,
        logout
    }
    
    return ( 
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
     );
}
 
