import React, {useRef, useEffect, useState} from "react";
import { firestoreFunc, firestoreClass } from "../firebase";
import {useAuth} from '../contexts/AuthContext'
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from './ChatMessage'


const Chatroom = (props) => {
//   const [chats, setChats] = useState([]);
//   const [roomId, setRoomId] = useState();

//   useEffect(() => {
//     const fetchData = async () => {
//         firebase.database().ref('chats/').orderByChild('roomname').equalTo(roomname).on('value', resp => {
//           setChats([]);
//           setChats(snapshotToArray(resp));
//         });
//     };
  
//     fetchData();
// }, [room, roomname]);


  const dummy = useRef();
  
  
  const messagesRef = firestoreFunc.collection('messages')
  const roomId = props.match.params.roomId;
  const query = messagesRef.orderBy('createdAt').where('roomId',"==",roomId).limit(10);
  var doc = query.get();
  if (!doc.exists) {
    console.log('No such document!');
  } else {
    console.log('Document data:', doc.data());
  }

  const {currentUser} = useAuth();
  const sender = currentUser.email;

  const [messages] = useCollectionData(query, { idField: 'id' });
  //console.log('retrieved messages: '+ messages)


  
  
  
  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    await messagesRef.add({
      text: formValue,
      createdAt: firestoreClass.FieldValue.serverTimestamp(),
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