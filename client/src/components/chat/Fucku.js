import React, { useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Fucku = (props) => {
    //hi
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
        setActiveChat(id);
    }

    
    return ( 
        <div className='container'>
            {(chatsArray.length > 0) && <div className='title is-5 is-uppercase has-text-success'>iNBOX</div>}
            {!connecting ? (
                <>
                    {
                        chatsArray.map((c, index) => (
                            <>
                            <Link className="box" onClick={() => handlesubmit(c.id)} key={index}>      
                                <span className="title is-4">{c.title}</span>
                                <br/>              
                                {/* username of the other user */}
                                <span className="subtitle is-6">{notMe(currentUser.email, c)}</span>
                                <br/>
                                {/* previews the last message
                                <span className="subtitle is-6">{c.last_message.text}</span> */}

                            </Link>
                            </>
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