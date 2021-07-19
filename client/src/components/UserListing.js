import React, {useEffect, useState}from "react"
import axios from 'axios'
import { useAuth } from "../contexts/AuthContext";
import BookCard from "./BookCard";
import  Header from './Header';

const UserListing = () => {
    const serverURL = 'https://nusbooktrade.herokuapp.com'; //CHANGE
    // const serverURL = 'http://localhost:4000';

    const {currentUser} = useAuth();
    let [listedBooks, setListedBooks] = useState();
    const [setUp, setSetUp] = useState(false);
    
    const fetchData = async () => {
      await axios({
        "method": "GET",
        "url": serverURL + '/api/books/' + currentUser.email + '/listing'  
      })
      .then((response) => {
        setListedBooks(response.data)
      })
      .catch((error) => {
        console.log(error)
      });
      setSetUp(true);
    }
    
    useEffect(() => {
      fetchData();
    }, [])

    let bookList;

    if(!listedBooks) {
      bookList = "You have not wishlisted anything yet!";
    } else {
      bookList = listedBooks.map((book, k) =>
        <BookCard book={book} key={k} size="is-one-fifth"/>
      );
    }

    return setUp ? ( 
      <div>
      <Header title="My Listings" />
      <br />
      <div className="container">
        <div className="box">
          <div className = "columns is-multiline">
              {bookList}
          </div>
        </div>
      </div>
      
    </div>
    ) : (<Header title="My Listings" />);
}
 
export default UserListing;