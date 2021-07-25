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
      <Header title="Chat Inbox"/>
      <br />
      <div className="container has-text-centered">
      <p className="subtitle has-text-white">PLEASE NOTE: Try clicking on a chat to make it load!</p>
        <div className="column is-10 is-offset-1">
   
          <div className="box">
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
      </div>
    </div>
  );
};

export default Inbox;