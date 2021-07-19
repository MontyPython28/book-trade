import React, { useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext';

const Fucku = (props) => {
    const notMe = (currentUsername, selectedChat) => {
        return selectedChat.people.find(p => p.person.username !== currentUsername)?.person?.username;
    };

    
    const {connecting, chats, setActiveChat} = props;
    const {currentUser} = useAuth();
    
    //making an array of independent chat objects
    var chatsArray = []
    for (const chatKey in chats) {
        if (chats.hasOwnProperty(chatKey)) {
            //console.log(`${chatKey}: ${chats[chatKey].last_message.text}`);
            chatsArray.push(chats[chatKey])    
        }
    }

    const handlesubmit = (id) => {
        //console.log('setting active chat')
        setActiveChat(id)
        console.log('active chat set')
    }

    
    return ( 
        <div className='container'>
            {!connecting ? (
                <>
                    {
                        chatsArray.map((c, index) => (
                            <div className="box" onClick={() => handlesubmit(c.id)} key={index}>      
                                <span className="title is-4">{c.title}</span>
                                <br/>              
                                {/* username of the other user */}
                                <span className="subtitle is-6">{notMe(currentUser.email, c)}</span>
                                <br/>
                                {/* previews the last message
                                <span className="subtitle is-6">{c.last_message.text}</span> */}

                            </div>
                        ))
                    }
                </>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
 
export default Fucku;