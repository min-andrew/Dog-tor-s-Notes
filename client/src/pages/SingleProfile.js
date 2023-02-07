import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_SINGLE_PROFILE } from '../utils/queries';
import { UPDATE_PROFILE, REMOVE_PROFILE } from '../utils/mutations.js';
import { Form, Button, Container, Header, Card } from 'semantic-ui-react'

const SingleProfile = () => {

  const { profileId } = useParams();

  const { loading, data, refetch } = useQuery(QUERY_SINGLE_PROFILE, {
    // pass URL parameter
    variables: { profileId: profileId },
  });

  // State for Update Form
  const [updateFormState, setUpdateFormState] = useState([]);

  const [updateProfile, { error: updateError }] = useMutation(UPDATE_PROFILE);

  const [removeProfile, { error: removeError }] = useMutation(REMOVE_PROFILE);

  // Update state based on Update Form input changes
  const handleChangeUpdate = (index, event) => {
    const { name, value } = event.target;

    const newUpdateFormState = updateFormState.map((profile, i) => {
      if (i === index) {
        return {
          ...profile,
          [name]: value,
        }
      }

      return profile
    })

    setUpdateFormState(newUpdateFormState);
  };

  // Submit form for Update Profile
  const handleFormSubmitUpdate = async (index, event) => {
    event.preventDefault();
    console.log(updateFormState[index]);

    try {
      const { data } = await updateProfile({
        variables: { ...updateFormState[index] },
      });
      console.log(data);

      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  // Handle Button click for Remove Profile
  const handleFormRemove = async (id, event) => {
    event.preventDefault();

    try {
      const { data } = await removeProfile({
        variables: { profileId: id },
      });
      console.log(data);

      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  const profile = data?.profile || {};

  {
    loading ? (
      <div>Loading profile...</div>
    ) : (
      <Container>
        <div className="single-profile-page">
          <Header as='h3'>
            <span>
              Here is
              {profile.petName}'s profile
            </span>
          </Header>
          {data.profiles.map((profile, index) =>
        <div>
        <Card className="single-profile-card"
          style={{
            lineHeight: '1.5',
            textAlign: 'center'
          }}
        >
          <Form style={{ padding: 10 }}
            index={index}
            key={profile._id}
            onSubmit={(event) => handleFormSubmitUpdate(index, event)}>
            <Form.Group>
              <Form.Field>
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
              <Button className="profile-btn"
                style={{ cursor: "pointer", backgroundColor: 'rgb(83,149,202)' }}
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
          {updateError && <div className="">{updateError.message}</div>}
          {removeError && <div className="">{removeError.message}</div>}
        </Card>
        </div>
          )}
        <div className='single-btn-group'>
          <Link to="/">
            <Button primary mini className='home-btns'>Home</Button>
          </Link>
          <Link to="/profiles">
            <Button primary mini className='vet-note-nav-btns'>Back to All Profile</Button>
          </Link>
        </div>
        
      </div>
      </Container>
    );
  };
};
  export default SingleProfile;

