import React, {useRef, useState} from "react";
import { firestore1, firestore2 } from "../firebase";
import {useAuth} from '../contexts/AuthContext'
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from './ChatMessage'


const Chatroom = (props) => {
  const dummy = useRef();
  const messagesRef = firestore1.collection('messages');
  const roomId = props.match.params.roomId;
  const query = messagesRef.where('roomId','==',roomId).orderBy('createdAt').limit(10);

  const {currentUser} = useAuth();
  const sender = currentUser.email;

  const [messages] = useCollectionData(query, { idField: 'id' });
  console.log('retrieved messages: '+messages)

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    //const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firestore2.FieldValue.serverTimestamp(),
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