import React, {useState} from 'react'
import Axios from 'axios';
import { Route, Redirect } from 'react-router-dom';
import {useAuth} from './context/AuthContext';

const PrivateRoute = ({component: Component, ...rest}) => {
    const serverURL = 'http://localhost:4000'; //'https://nusbooktrade.herokuapp.com'; //CHANGE
    const {currentUser} = useAuth();
    
    return ( 
        <Route
            {...rest}
            render={props => {
                return currentUser ? <Component {...props } /> : <Redirect to='/login'/>
            }}
        ></Route>
     )
}
 
export default PrivateRoute;