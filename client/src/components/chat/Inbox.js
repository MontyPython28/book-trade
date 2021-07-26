import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ChatFeed, ChatEngine, getLatestChats } from 'react-chat-engine';
import Header from '../Header'
import Fucku from './Fucku';
import Fucku2 from './Fucku2'
import '../../App.css';

const Inbox = () => {
  const [latestChat, setLatestChat] = useState();
  const {
    chatConfig
  } = useAuth();

  const loadLatestChat = async () => {
    const authObject = chatConfig;
    const count = 1
    const callback = (chats) => {
      if(chats) {
        console.log('successfully found this chat: '+chat)
        setLatestChat(chats);
      }
    }

    await getLatestChats(authObject, count, callback)
  }

  useEffect(() => {
    loadLatestChat();
  }, [])
  

  return (
    <div>
      <Header title="Chat Inbox"/>
      <br />
      <div className="container has-text-centered">
      <p className="subtitle has-text-white">PLEASE NOTE: Try clicking on a chat to make it load!</p>
        <div className="column is-10 is-offset-1">
   
          <div className="box">
            {latestChat 
              ? <ChatEngine
              userName={chatConfig.userName}
              projectID={chatConfig.projectID}
              userSecret={chatConfig.userSecret}
              renderChatList={(chatAppState) => <Fucku  {...chatAppState} chatsAvailable={true}/>}
              renderChatFeed={(chatAppState) => <ChatFeed {...chatAppState} activeChat={latestChat}/>}
              renderChatSettings={(chatAppState) => <Fucku2 {...chatAppState}/>}
              offset={8}
                />
              : <ChatEngine
              userName={chatConfig.userName}
              projectID={chatConfig.projectID}
              userSecret={chatConfig.userSecret}
              renderChatList={(chatAppState) => <Fucku  {...chatAppState} chatsAvailable={false}/>}
              renderChatFeed={(chatAppState) => <ChatFeed {...chatAppState}/>}
              renderChatSettings={(chatAppState) => <Fucku2 {...chatAppState}/>}
              offset={8}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;