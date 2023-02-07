import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ONE_VETNOTE } from '../utils/queries';
import { Button, Container, Header, Card } from 'semantic-ui-react'

const SingleVetNote = () => {
  
  const { vetNoteId } = useParams();

  const { loading, data } = useQuery(QUERY_ONE_VETNOTE, {
    // pass URL parameter
    variables: { vetNoteId: vetNoteId },
  });

  const vetNote = data?.vetNote || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
        <div className="single-vet-page">
            <Header as='h3'>
                <span>
                You created this note on <br/>
                {vetNote.createdAt}
                </span>
            </Header>
      <Card className="single-vet-card" 
            style={{
            lineHeight: '1.5',
            textAlign: 'center'
          }}
        > 
        <Header textAlign={"center"}>Your Pet's Name</Header>
          {vetNote.petName}
        <Header textAlign={"center"}>Appointment Date</Header>
          {vetNote.appointmentDate}
        <Header textAlign={"center"}>Primary Concern</Header>
          {vetNote.primaryConcern}
        <Header textAlign={"center"}>Date of Symptom Onset</Header>
          {vetNote.onsetDate}
        <Header textAlign={"center"}>Other Concerns</Header>
          {vetNote.otherConcerns}
 
      </Card>
        <div className='single-btn-group'>
      <Link to="/">
          <Button primary mini className='vet-note-nav-btns'>Home</Button>
        </Link>
        <Link to="/vetNotes">
          <Button primary mini className='vet-note-nav-btns'>More Vet Notes</Button>
        </Link>
        </div>
     </div>
     </Container>
  );
};

export default SingleVetNote;

