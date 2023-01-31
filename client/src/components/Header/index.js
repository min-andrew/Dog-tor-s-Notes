import React from 'react';
import { Link } from 'react-router-dom';


import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="">
      <div className="">
        <Link className="" to="/">
          <h1 className="" style={{}}>
            Dog-tor's Notes
          </h1>
        </Link>
        <div>
          <Link className="" to="/profiles/:profileId">
            Profile
          </Link>
          {Auth.loggedIn() ? (
            <button className="" onClick={logout}>
              Logout
            </button>
          ) : (
            <>
              <Link className="" to="/login">
                Login
              </Link>
              <Link className="" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
