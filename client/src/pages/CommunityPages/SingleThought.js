import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Container, Card, Divider, Header } from 'semantic-ui-react'


import CommentList from '../../components/CommunityComp/CommentList';
import CommentForm from '../../components/CommunityComp/CommentForm';
import CommunityHeader from '../../components/CommunityComp/CommunityHeader';


import { QUERY_SINGLE_THOUGHT } from '../../utils/DiscussionUtils/queries';

const SingleThought = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
    // pass URL parameter
    variables: { thoughtId: thoughtId },
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
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
          <h3>
            {thought.thoughtAuthor} <br />
            <Header.Subheader style={{ fontSize: '1rem', color: 'grey' }}>
              had this thought on {thought.createdAt}
            </Header.Subheader>
          </h3>
          <div style={mainStyle}>
            <div
              style={{
                fontSize: '1.5rem',
                // fontStyle: 'italic',
                border: '2px',
                lineHeight: '1.5',
              }}
            >
              {thought.thoughtText}
            </div>
          </div>
          <div style={{ textAlign: "-webkit-center" }}>
            <Divider style={{ width: '80%' }} />
          </div>
          <h3 style={style}>
            Comments
          </h3>
          <div style={style}
          >
            <CommentForm thoughtId={thought._id} />
          </div>
          <div style={style}
          >
            <CommentList comments={thought.comments} />
          </div>
        </Container>
      </Card>
    </div>
  );
};

export default SingleThought;
