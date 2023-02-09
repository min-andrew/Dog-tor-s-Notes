import React from 'react';
import { useQuery } from '@apollo/client';
import { Container, Card } from 'semantic-ui-react'


import ThoughtList from '../../components/CommunityComp/ThoughtList';
import ThoughtForm from '../../components/CommunityComp/ThoughtForm';
import CommunityHeader from '../../components/CommunityComp/CommunityHeader';

import { QUERY_THOUGHTS } from '../../utils/DiscussionUtils/queries';

const CommunityHome = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];


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
    <main style={mainStyle}>
      <Card style={cardStyle}>
        <div>
          <CommunityHeader />
        </div>
        <div>
          <Container textAlign='center'>
            <div style={style}>
              <ThoughtForm />
            </div>
            <div style={style}>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <ThoughtList
                  thoughts={thoughts}
                  title="Some Feed for Thought(s)..."
                />
              )}
            </div>
          </Container>
        </div>
      </Card>
    </main >
  );
};

export default CommunityHome;
