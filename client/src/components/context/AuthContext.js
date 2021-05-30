import React, { useEffect, useState, useContext } from 'react'
import Axios from 'axios'


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loggedin, setLoggedin] = useState(false)

    async function signup(email, password) {
        const res = await Axios({
            method: "POST",
            data: {
                username: email,
                password: password,
            },
            withCredentials: true,
            url: "http://localhost:4000/register",
        });
        
        async function signup2() {
            console.log(res.data.signupAttempt);
            if(res.data.signupAttempt) {
                setCurrentUser(res.data.userId);
                setLoggedin(true);
                console.log(currentUser + 'signed up and logged in');
            } else throw new Error("signup failed"); 
        }
        
        await signup2();
    };

    async function login(email, password) {
        
        const res = await Axios({
            method: "POST",
            data: {
                username: email,
                password: password,
            },
            withCredentials: true,
            url: "http://localhost:4000/login",
        });
        
        async function login2() {     
            if(res.data.loginAttempt) {
                setCurrentUser(res.data.userId);
                setLoggedin(true);
                console.log(currentUser + 'logged in');
            } else throw new Error("login failed"); 
        }

        await login2();

    };

    async function logout() {
        const res = await Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:4000/logout",
        });
        
        setLoggedin(false)
        console.log(res + 'logged out');
    };

    async function getUser() {
        const res = await  Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:4000/user",
          });
        
        setCurrentUser(res.data);
        console.log(res.data);
    };

    useEffect(() => {
        setCurrentUser();
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
 
