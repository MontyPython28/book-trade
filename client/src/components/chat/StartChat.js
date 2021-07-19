import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext"
import { getChats, addPerson, newChat, leaveChat, deleteChat, getMessages } from 'react-chat-engine';

const StartChat = ({title, seller, history}) => {
    const { currentUser, createChatClick, chatConfig } = useAuth();
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("");
  
    function timeout(delay) {
      return new Promise( res => setTimeout(res, delay) );
    }
  
    const [ChatButtonClass, setChatButtonClass] = useState('button is-success is-outlined is-fullwidth');
  
    const onSubmit = (event) => {
      var needNewChat = true;
      event.preventDefault();
      setChatButtonClass('button is-success is-medium is-outlined is-fullwidth is-loading');
      console.log(title)
      console.log('sellers name '+seller)
      const createChat = (permission) => {
        if(permission) {
          console.log('2:'+ needNewChat);
          newChat(chatConfig, { title: title }, (data) => {
            //console.log(data);
            const chatId = data.id;
            const username = seller;
            addPerson(chatConfig, chatId, username, (data) => {
              console.log('success: '+ data);
            })
          });
        }
      }
      getChats(chatConfig, (chats) => {
        console.log(chats.length)
        for(var i = 0; i < chats.length; i++) {
          console.log(chats[i].title)
          if(chats[i].title === title) {
            console.log(chats[i].people.length)
            for(var j = 0; j < chats[i].people.length; j++) {
              console.log(chats[i].people[j].person.username)
              if(chats[i].people[j].person.username === seller) {
                needNewChat = false;
                console.log(needNewChat)
              }
            }
          }
        }
        createChat(needNewChat);
      })
      
      history.push('/inbox');
      //setChatButtonClass('button is-success is-outlined is-fullwidth');
    };
  
  
    return currentUser && (seller === currentUser.email)
    ? (
          <div></div>
      )
    : (
      <div className="is-centred">
          <div className = "column has-text-centered is-third">
              <button type="button" className={ChatButtonClass} onClick={onSubmit}>Chat with seller</button>
          </div>
          {error && <div className="notification is-danger is-light">{error}</div>}
          {success && <div className="notification is-success is-light">{success}</div>}
      </div>
    );
  };
  
  export default StartChat;