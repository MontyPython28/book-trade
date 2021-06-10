import React, {useState} from 'react'
import Axios from 'axios';
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({component: Component, ...rest}) => {
    const serverURL = 'https://nusbooktrade.herokuapp.com';
    const [loggedin, setLoggedin] = useState(true);
    async function getUser() {
        const res = await  Axios({
            method: "GET",
            withCredentials: true,
            url: serverURL + '/user',
          });
        
        setLoggedin(true);
        console.log(loggedin);
    };

    getUser();
    return ( 
        <Route
            {...rest}
            render={props => {
                return loggedin ? <Component {...props } /> : <Redirect to='/login'/>
            }}
        ></Route>
     )
}
 
export default PrivateRoute;