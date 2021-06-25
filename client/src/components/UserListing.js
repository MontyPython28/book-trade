import React, {useEffect, useState}from "react"
import axios from 'axios'
import { useAuth } from "../contexts/AuthContext";

const UserListing = () => {
    const serverURL = 'http://localhost:4000/';
    const {currentUser} = useAuth();
    let [listedBooks, setListedBooks] = useState('initially');
    
    const fetchData = async () => {
      await axios({
        "method": "GET",
        "url": serverURL + 'api/books/' + currentUser.email + '/listing'  
      })
      .then((response) => {
        setListedBooks(response.data)
      })
      .catch((error) => {
        console.log(error)
      });
    }
    
    useEffect(() => {
      fetchData()
    }, [])

    return ( 
    <h1>{listedBooks}</h1> 
    );
}
 
export default UserListing;