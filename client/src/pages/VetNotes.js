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
      <Segment>
          <Header as='h1'>Veterinary Notes</Header>
      </Segment>




      <Segment>
      <Header as='h2'>Here is a list of your vet notes:</Header>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="square">
            {vetNoteList.map((vetNotes) => {
              return (
                <li key={vetNotes._id}>
                  <Link to={{ pathname: `/vetNotes/${vetNotes._id}` }}>
                    {vetNotes.appointmentDate}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </Segment>

      <Segment>
        <Header as='h2'>Ready to create a new Vet Note?</Header>
        <Link to="/vetForm">
          <Button primary>Create Vet Note!</Button>
        </Link>
        </Segment>
        </Container>
  );
};

export default VetNotes;

