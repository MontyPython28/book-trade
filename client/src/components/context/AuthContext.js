import React, { useEffect, useState, useContext } from 'react';
import Axios from 'axios';


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const serverURL = 'https://nusbooktrade.herokuapp.com'

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
            //await setCurrentUser(res.data.userId);
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
            await setCurrentUser(res.data.userId);
            console.log(currentUser + 'logged in');
        } else throw new Error("login failed");      

    };

    async function logout() {
        const res = await Axios({
            method: "GET",
            withCredentials: true,
            url: serverURL + '/logout',
        });
        
        await setCurrentUser(null);
        console.log(res + 'logged out');
    };

    async function getUser() {
        const res = await  Axios({
            method: "GET",
            withCredentials: true,
            url: serverURL + '/user',
          });
        
        await setCurrentUser(res.data.username);
        console.log('context sets the current user as: ' + currentUser)
    };


   

    useEffect(async () => {
        await getUser();
        setLoading(false);
    }, [])
    

    const value = {
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
 
