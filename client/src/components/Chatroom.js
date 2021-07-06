import React, {useRef, useState} from "react";
import { firestore } from "../firebase";
import {useAuth} from '../contexts/AuthContext'
import { useCollectionData } from "react-firebase-hooks/firestore";


function ChatMessage(props) {
    const { text, sender, currentUserEmail } = props.message;
  
    const messageClass = sender === currentUserEmail ? 'sent' : 'received';
  
    return (<>
      <div className={`message ${messageClass}`}>
        <p>{text}</p>
      </div>
    </>)
}

const Chatroom = (props) => {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const roomId = props.match.params.roomId;
  const query = messagesRef.whereEqualTo("roomId", roomId).orderBy('createdAt');

  const {currentUser} = useAuth();
  const sender = currentUser.email;

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    //const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firestore.FieldValue.serverTimestamp(),
    //   uid,
    //   photoURL
      sender,
      roomId
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage currentUserEmail={sender} key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </>)
}



 
export default Chatroom;