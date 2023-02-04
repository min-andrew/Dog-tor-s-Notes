import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_VETNOTES } from '../utils/queries';
import { Button, Container, Segment, Header } from 'semantic-ui-react'

const VetNotes = () => {
  const { loading, data } = useQuery(QUERY_VETNOTES, {
    fetchPolicy: "no-cache"
  });

  const vetNoteList = data?.vetNotes || [];

  return (
    <Container>
      <Segment basic textAlign={"center"}>
          <Header>Veterinary Notes</Header>
      </Segment>

      <Segment basic textAlign={"center"}>
      <Header>Here is a list of your vet notes:</Header>
      {loading ? (
          <div>Loading...</div>
        ) : (

      <ul className="square">
      {vetNoteList.map((vetNote) => {
              return (
                <li key={vetNote._id}>
                  <Link to={{ pathname: `/vetnotes/${vetNote._id}` }}>
                    {vetNote.createdAt}
                  </Link>
                </li>
              );
            })}
      </ul>
        )}
      </Segment>

      <Segment basic textAlign={"center"}>
        <Header>Ready to create a new Vet Note?</Header>
        <Link to="/vetForm">
          <Button primary>Create Vet Note!</Button>
        </Link>
        </Segment>
        </Container>
  );
};

export default VetNotes;

