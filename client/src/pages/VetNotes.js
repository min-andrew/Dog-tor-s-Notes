import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_VETNOTES } from '../utils/queries';
import { Button, Container, Header, Card} from 'semantic-ui-react';

const VetNotes = () => {
  const { loading, data } = useQuery(QUERY_VETNOTES, {
    fetchPolicy: "no-cache"
  });

  const vetNoteList = data?.vetNotes || [];

  return (
    <Container className='vet-notes-container'>
      
          <Header textAlign={"center"}>Veterinary Notes</Header>
      

         <Header className='vet-h2' textAlign={"center"} >Here is a list of your vet notes:</Header>
      {loading ? (
          <div>Loading...</div>
        ) : (

      <div className="note-card-container">
      {vetNoteList.map((vetNote) => {
              return (
                <div>
                <Card key={vetNote._id} className="note-render">
                  <Link to={{ pathname: `/vetnotes/${vetNote._id}` }}>
                    {vetNote.petName} 🦴<br/> 
                    {vetNote.createdAt}
                  </Link>
                </Card>
                </div>
              );
            })}
      </div>
        )}
  


        <Header textAlign={"center"}>Ready to create a new Vet Note?</Header>
        <Link to="/vetForm">
          <Button primary className='vet-note-nav-btns'>Create Vet Note!</Button>
        </Link>
        <Link to="/">
          <Button primary className='vet-note-nav-btns'>Back Home</Button>
        </Link>

        </Container>
  );
};

export default VetNotes;

