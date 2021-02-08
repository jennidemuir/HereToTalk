import React, { useState, useEffect} from 'react';
import firebase from 'firebase/app';
import Message from '../Messages/Messages';

import './channel.styles.scss'

import image from '../../Utilities/Images/talk.jpg'



const Channel = ({ user = null, db = null}) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const {uid, displayName, photoURL} = user

    useEffect(()=>{
        if(db){
          const unsubscribe = db
          .collection('messages')
          .orderBy('createdAt')
          .limit(100)
          .onSnapshot(querySnapshot => {
              const data = querySnapshot.docs.map(doc => ({
                  ...doc.data(),
                  id: doc.id
              }))
              
              setMessages(data)
          })

          return unsubscribe
        }
    }, [db]);

    const handleOnChange = e => {
        setNewMessage(e.target.value)
    }

    const handleOnSubmit = e => {
        e.preventDefault();

        if(db){
            db.collection('messages').add({
                text: newMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL
                })
        }
        setNewMessage('')
    }

    return (
        <>
        <div className="img-container">
            <img className="img" src={image} />
          </div>
        <div className='message-body'>
        
            <ul >
                {messages.map(message => (
                  <li  key={message.id}>
                    <Message {...message} /> 
                  </li> 
                 ))}
            </ul>
        </div>
        <div className='chat-box-area'>
        
            <form  onSubmit={handleOnSubmit}>
                <div className='textarea'>
                <input
                    className='chat-area'
                    type='text'
                    value={newMessage}
                    onChange={handleOnChange}
                    placeholder='Type your message here...'
                />
                {/* </div> */}
                {/* <div className='submit-button'> */}
                <button className='submit-button' type='submit' disabled={!newMessage}>
                    Send
                </button>
                </div>

            </form>
        </div>

        </>
    );
}

export default Channel;