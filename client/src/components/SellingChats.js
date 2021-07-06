import React, {useState, useEffect} from "react";
import axios from 'axios'
import { useAuth } from "../contexts/AuthContext";
import Header from './Header';
import {Link} from 'react-router-dom'
import ChatLink from './ChatLink'


const SellingChats = () => {
    const serverURL = 'http://localhost:4000/';
    let [chatLinks, setChatLinks] = useState();
    const [loading, setLoading] = useState(true);
    const {currentUser} = useAuth();

    const fetchData = async () => {
        await axios({
          "method": "GET",
          "url": serverURL + 'selling-chats/' + currentUser.email 
        })
        .then((response) => {
          console.log('selling chat list: '+ response.data.sellingchat)
          setChatLinks(response.data.sellingchat);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error)
        });
      }
      
      useEffect(() => {
        fetchData()
      }, [])

      let linksList;
    
      if(!loading) {
        if(!chatLinks) {
          linksList = "There are no chats";
        } else {
          linksList = chatLinks.map((link, k) =>
            <ChatLink link={link} key={k} />
          );
        }
      }

      return ( 
        <div>
        <Header title="View All Chats" />
        <div className="container">
          <div className = "columns is-multiline">
              {linksList}
          </div>
        </div>
        
      </div>
      );
}
 
export default SellingChats;