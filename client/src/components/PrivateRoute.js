import React, {useState} from 'react'
import Axios from 'axios';
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({component: Component, ...rest}) => {
    const serverURL = 'http://localhost:4000'; //'https://nusbooktrade.herokuapp.com'; //CHANGE
    const [loggedin, setLoggedin] = useState(true);
    async function getUser() {
        const res = await  Axios({
            method: "GET",
            withCredentials: true,
            url: serverURL + '/user',
          });
        
        if(res.data.loggedin) {
            setLoggedin(true);
        } else {
            setLoggedin(false)
        }
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