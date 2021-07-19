import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ChatFeed, ChatEngine } from 'react-chat-engine';
import Header from '../Header'
import Fucku from './Fucku';
import Fucku2 from './Fucku2'
import '../../App.css';

const Inbox = () => {
  const {
    chatConfig
  } = useAuth();

  return (
    <div>
      <Header title="Inbox"/>
        <br />
        <div className="container">
      
        <ChatEngine
          userName={chatConfig.userName}
          projectID={chatConfig.projectID}
          userSecret={chatConfig.userSecret}
          renderChatList={(chatAppState) => <Fucku  {...chatAppState} />}
          renderChatFeed={(chatAppState) => <ChatFeed {...chatAppState}/>}
          renderChatSettings={(chatAppState) => <Fucku2 {...chatAppState}/>}
          offset={8}
        />
      
      </div>
    </div>
  );
};

export default Inbox;