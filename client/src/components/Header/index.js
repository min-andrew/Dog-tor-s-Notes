import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Sticky } from 'semantic-ui-react';

import Auth from '../../utils/auth';

const DogHeader = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const style = {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }
  const menu = {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%'
  }

  const buttonstyle = {
    
  }

  return (
    <Sticky>
      <Header style={style} as='h3' dividing textAlign='center'>
        <div>
          <Link className="" to="/">
            <h1 className="" style={{}}>
              Dog-tor's Notes
            </h1>
          </Link>
          <Header style={menu} textAlign='center' >
            {Auth.loggedIn() ? (
              <button onClick={logout}>
                Logout
              </button>
            ) : (
              <>
                <Link to="/login">
                  Login
                </Link>
                <Link className="" to="/signup">
                  Signup
                </Link>
              </>
            )}
          </Header>
        </div>
      </Header>
    </Sticky>
  );
};

export default DogHeader;
