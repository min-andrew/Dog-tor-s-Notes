import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const style = {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    return (
        <footer style={style}>
            <div className="">
                {location.pathname !== '/' && (
                    <button
                        className=""
                        onClick={() => navigate(-1)}
                    >
                        &larr; Go Back
                    </button>
                )}
                <h4>&copy; {new Date().getFullYear()} - Dog-tors</h4>
            </div>
        </footer>
    );
};

export default Footer;
