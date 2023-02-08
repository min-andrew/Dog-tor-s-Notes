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
    marginTop: 0,
  };
  const menu = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  };

  return (
    <Sticky>
      <Header style={style} as="h3" dividing textAlign="center">
        <div>
          <Link className="" to="/">
            <Image
              className="dogter-banner"
              src="https://user-images.githubusercontent.com/110498167/217140031-0b16bf64-3951-4183-a4db-a65b5c9b3fd4.png"
              fluid
            />
          </Link>
          <Header style={menu} textAlign="center" className="header-top">
            {Auth.loggedIn() ? (
              <div>
                <Button primary mini compact onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <></>
            )}
          </Header>
        </div>
      </Header>
    </Sticky>
  );
};

export default DogHeader;
