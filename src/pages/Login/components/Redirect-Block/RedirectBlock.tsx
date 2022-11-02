import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Props } from './types';

const RedirectLoginBlock: Props = ({type}) => {
    if (type === 'login') {
        return (
            <>
                <p>need an account?</p>
                <NavLink to="/signup">Sign up!</NavLink>            
            </>
        )
    } else {
        return (
          <div>
            <p>Already a user?</p>
            <NavLink to="/login">Log in!</NavLink> 
          </div>
        )
    }
}

export default memo(RedirectLoginBlock);