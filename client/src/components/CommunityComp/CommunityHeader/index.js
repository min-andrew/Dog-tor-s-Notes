import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react'

const CommunityHeader = () => {

  const rightStyle = {
    margin: '15px',
    marginBottom: '50px'
  }


  const buttonStyle = {
    height: '35px',
    width: '80px',
    padding: '0px'
  }

  return (
    <div>
      <Header textAlign='center'>
        <div>
          <Link to="/CommunityHome">
            <h1>Doggy Community</h1>
          </Link>
          <Header.Subheader>Speak with your fellow pet owners!</Header.Subheader>

          <div style={rightStyle}>
            <div>
              <Link to="/myThoughts">
                Your Thoughts
              </Link>
              <Header.Subheader style={{ marginTop: '9px' }}>
                <Link to="/">
                  <Button primary mini style={buttonStyle}>Back Home</Button>
                </Link>
              </Header.Subheader>
            </div>
          </div>
        </div>
      </Header>

    </div>
  );
};

export default CommunityHeader;
