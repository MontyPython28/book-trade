import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ChatFeed, getLatestChats, ChatEngine } from 'react-chat-engine';
import Header from '../Header'
import Fucku from './Fucku';
import Fucku2 from './Fucku2'
import '../../App.css';

const Inbox = () => {
  const {
    chatConfig
  } = useAuth();

  const [currentChat, setCurrentChat] = useState();

  useEffect(() => {
    const count = 1
    const callback = (chats) => {
      console.log(chats)
      setCurrentChat(chats)
    }
    getLatestChats(chatConfig, count, callback)
  }, [])

  return (
    <div>
      <Header title="Inbox"/>
        <br />
        <div className="container">
      {!!currentChat && (
        <ChatEngine
          userName={chatConfig.userName}
          projectID={chatConfig.projectID}
          userSecret={chatConfig.userSecret}
          renderChatList={(chatAppState) => <Fucku  {...chatAppState} />}
          renderChatFeed={(chatAppState) => <div style={{ width: '100%' }}>{currentChat[0] ? <ChatFeed {...chatAppState} activeChat={currentChat[0].id} /> : <ChatFeed {...chatAppState}/>}</div>}
          renderChatSettings={(chatAppState) => <Fucku2 {...chatAppState}/>}
        />
      )}
      </div>
    </div>
  );
};

export default Inbox;