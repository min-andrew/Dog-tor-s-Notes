import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_PROFILE } from '../utils/queries';
import { Button, Container, Header, Card } from 'semantic-ui-react'

const SingleProfile = () => {
  
  const { profileId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
    // pass URL parameter
    variables: { profileId: profileId },
  });

  const profile = data?.profile || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
        <div className="">
          {loading ? (
            <div>Loading profile...</div>
          ) : (

            <div>
              <Header className="">Here is your lovely Dog's Profile List</Header>
              {data.profiles.map((profile, index) =>
                <Form style={{ padding: 10 }}
                  index={index}
                  key={profile._id} 
                  onSubmit={(event) => handleFormSubmitUpdate(index, event)}>
                  <Form.Group>
                    <Form.Field >
                      {/* update field for pet name */}
                      <input
                        className=""
                        placeholder="Your pet name"
                        name="petName"
                        type="text"
                        value={updateFormState[index].petName}
                        onChange={(ev) => handleChangeUpdate(index, ev)}
                      />
                    </Form.Field>
                    <Form.Field>
                      {/* update field for age of pet */}
                      <input
                        className=""
                        placeholder="Your pet age"
                        name="age"
                        type="number"
                        value={updateFormState[index].age}
                        onChange={(ev) => handleChangeUpdate(index, ev)}
                      />
                    </Form.Field>
                    <Form.Field>
                      {/* update field for pet breed */}
                      <input
                        className=""
                        placeholder="Your pet breed"
                        name="breed"
                        type="text"
                        value={updateFormState[index].breed}
                        onChange={(ev) => handleChangeUpdate(index, ev)}
                      />
                    </Form.Field>
                    <Form.Field>
                      {/* update field for pet food brand */}
                      <input
                        className=""
                        placeholder="Your pet food brand"
                        name="foodBrand"
                        type="text"
                        value={updateFormState[index].foodBrand}
                        onChange={(ev) => handleChangeUpdate(index, ev)}
                      />
                    </Form.Field>
                    <Form.Field>
                      {/* update field for owner name */}
                      <input
                        className=""
                        placeholder="Owner's name"
                        name="humanName"
                        type="text"
                        value={updateFormState[index].humanName}
                        onChange={(ev) => handleChangeUpdate(index, ev)}
                      />
                    </Form.Field>
                    {/* button for updating profile */}
                    <Button                      className="profile-btn"
                      style={{ cursor: "pointer", backgroundColor: 'rgb(83,149,202)'}}
                      type="submit"
                    >
                      Update Profile
                    </Button>
                    {/* button for removing profile */}
                    <Button
                      className="profile-btn"
                      style={{ cursor: "pointer", backgroundColor: 'red', marginBottom: 40 }}
                      type="button"
                      onClick={(ev) => handleFormRemove(profile._id, ev)}
                    >
                      Remove Profile
                    </Button>
                  </Form.Group>
                </Form>
              )}
            </div>)
          }
          {updateError && <div className="">{updateError.message}</div>}
          {removeError && <div className="">{removeError.message}</div>}
        </div>
        <Link to="/">
          <Button primary className='vet-note-nav-btns'>Back Home</Button>
        </Link>
        
     </Container>
  );
};

export default SingleProfile;

