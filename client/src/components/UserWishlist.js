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
  const [loading, setLoading] = useState(true);
  
  const fetchData = async () => {
    await axios({
      "method": "GET",
      "url": serverURL + '/api/books/' + currentUser.email + '/wishlist'  
    })
    .then((response) => {
      setListedBooks(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error)
    });
  }
  
  useEffect(() => {
    fetchData()
  }, [])

  let bookList;
  
  if(!loading) {
    if(!listedBooks) {
      bookList = "There is no book record!";
    } else {
      bookList = listedBooks.map((book, k) =>
        <BookCard book={book} key={k} size="is-one-fifth"/>
      );
    }
  }

  return ( 
    <div>
      <Header title="My Wishlist" />
      <br />
      <div className="container">
        <div className="box">
          <div className="columns is-multiline">
          {bookList}
          </div>
        </div>
      </div>      
    </div>
  );
}
 
export default UserListing;