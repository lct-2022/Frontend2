import React, { memo } from 'react';
import { Props } from './types';

const RedirectLoginBlock: Props = ({type}) => {
    if (type === 'login') {
        return (
            <>
                <p>need an account?</p>
                <a href="/signup" target="_self" rel="noopener norefere">Sign up!</a>            
            </>
        )
    } else {
        return (
          <div>
            <p>Already a user?</p>
            <a href="/login" target="_self" rel="noopener norefere">Log in!</a> 
          </div>
        )
    }
}

export default memo(RedirectLoginBlock);