import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Container, Card } from 'semantic-ui-react'

import ThoughtForm from '../../components/CommunityComp/ThoughtForm';
import ThoughtList from '../../components/CommunityComp/ThoughtList';
import CommunityHeader from '../../components/CommunityComp/CommunityHeader';

import { QUERY_USER, QUERY_ME } from '../../utils/DiscussionUtils/queries';

import Auth from '../../utils/auth';

const CommunityProfile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/myThoughts" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const style = {
    paddingTop: '10px',
    paddingBottom: '20px'
  }

  const cardStyle = {
    width: '80%'
  }

  const mainStyle = {
    textAlign: "-webkit-center"
  }

  return (
    <div style={mainStyle}>
      <Card style={cardStyle}>
        <CommunityHeader />
        <Container textAlign='center'>
          <div style={style}>
            <h2>
              {userParam ? `${user.username}'s` : 'Your'} Thoughts
            </h2>

            <div>
              {!userParam && (
                <div style={style}>
                  <ThoughtForm />
                </div>
              )}
              <ThoughtList
                thoughts={user.thoughts}
                title={`${user.username}'s thoughts...`}
                showTitle={false}
                showUsername={false}
                style={style}
              />
            </div>
          </div>
        </Container>
      </Card>
    </div>
  );
};

export default CommunityProfile;
