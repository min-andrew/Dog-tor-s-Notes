import React from "react";
import { Link } from "react-router-dom";
import { Header, Sticky, Button, Image } from "semantic-ui-react";

import Auth from "../../utils/auth";

const DogHeader = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const style = {
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  };
  const menu = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  };

  const buttonstyle = {
    // display: 'flex',
    // justifyContent: 'space-evenly',
    // alignItems: 'center',
    // width: '100%'
  };

  return (
    <Sticky>
      <Header style={style} as="h3" dividing textAlign="center">
        <div>
          <Link className="" to="/">
          <Image src='https://user-images.githubusercontent.com/110498167/217140031-0b16bf64-3951-4183-a4db-a65b5c9b3fd4.png' fluid />
  
          </Link>
          <Header style={menu} textAlign="center">
            {Auth.loggedIn() ? (
              <div style={buttonstyle}>
                <Button primary mini onClick={logout} className="nav-buttons">
                  Logout
                </Button>
              </div>
            ) : (
              <>
                {/* <Link to="/login"><Button primary mini className="nav-buttons">
                  Login
                </Button></Link>
                <Link className="" to="/signup"><Button primary mini className="nav-buttons">
                  Signup</Button>
                </Link> */}
              </>
            )}
          </Header>
        </div>
      </Header>
    </Sticky>
  );
};

export default DogHeader;
