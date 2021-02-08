import React from 'react';

import './buttons.styles.scss'


const Button = ({onClick = null, children = null}) => {
    return( 
    <button 
    
        onClick={onClick}>{children}</button>)
}

export default Button