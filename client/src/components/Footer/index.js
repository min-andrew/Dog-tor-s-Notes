import React from 'react';

import {Image} from "semantic-ui-react";

const Footer = () => {
 
    const style = {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    return (
        <footer style={style}>
            <div className="bottom-sig">
                <h5 className='sig'>&copy; {new Date().getFullYear()} - Dog-tors</h5>
                <Image className='dog-logo' src='https://user-images.githubusercontent.com/110498167/216803046-1e2afc0f-681a-4f68-a0d6-deb3ff194e5f.png' size='mini' />
            </div>
        </footer>
    );
};

export default Footer;