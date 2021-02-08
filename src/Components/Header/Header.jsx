import React from 'react';
// import Buttons from '../Buttons/Buttons';
import image from '../../Utilities/Images/blue.jpg'

import './header.styles.scss'

const styles = {
    
}

const Header = ({user = null, signOut}) => (
    <div className='header'>
        
            <div clasName='image-container'>
            <img className='image' src={image}/>
            </div>
            <h1 className='heading'>
                I'm Here If You Need To Talk
             </h1>
        
    {user ? (
        
        <div className='signOutContainer'>
        <div className='signOut' onClick={signOut}>
            Sign Out
        </div>
        </div>
        // <Buttons  
        // onClick={signOut}
        // signOut
        // >
        //     Sign out</Buttons>
      
      ) : null
     }
     
    </div>
)
export default Header;