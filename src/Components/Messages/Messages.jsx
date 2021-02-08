import React from 'react';
import {formatRelative} from 'date-fns';

import './messages.styles.scss'

const Message = ({
    createdAt = null,
    text = '',
    displayName = '',
    photoURL = '',
}) => {
    return( 
    <div>
        <div div className='flex-container'>
        {photoURL ? (
         <img  className='message-img' src={photoURL} alt='Avatar' width={45} height={45} />
        ) : <img className='message-img' />}
        
        {displayName ? <p className="message-name">{displayName}</p> : <p className="message-name"></p>}
        
        {createdAt ?.seconds ? (
            <span className="message-date">
                {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
            </span>
            
        ) : null}
        </div>
        <p>{text}</p>

     </div>
)}

export default Message;