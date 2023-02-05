import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Button, Container, Header, Card } from 'semantic-ui-react'
import { ADD_PROFILE, UPDATE_PROFILE, REMOVE_PROFILE } from '../utils/mutations.js';
import { QUERY_PROFILES } from "../utils/queries.js";

const Profile = () => {
  // State for Add Form
  const [addFormState, setAddFormState] = useState({
    petName: "",
    age: "",
    breed: "",
    foodBrand: "",
    humanName: "",
  });

  // State for Update Form
  const [updateFormState, setUpdateFormState] = useState([]);

  // Fetch all profiles data
  // use refetch to execute refresh in some situations
  const { loading, data, refetch } = useQuery(QUERY_PROFILES, { onCompleted: (data) => setUpdateFormState(data.profiles) });

  // Post profile data
  const [addProfile, { error: addError }] = useMutation(ADD_PROFILE);

  const [updateProfile, { error: updateError }] = useMutation(UPDATE_PROFILE);

  const [removeProfile, { error: removeError }] = useMutation(REMOVE_PROFILE);

  // Update state based on Add Form input changes
  const handleChangeAdd = (event) => {
    const { name, value } = event.target;

    setAddFormState({
      ...addFormState,
      [name]: value,
    });
  };

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

  // Submit form for Add Profile
  const handleFormSubmitAdd = async (event) => {
    event.preventDefault();
    console.log(addFormState);

    try {
      const { data } = await addProfile({
        variables: { ...addFormState },
      });
      console.log(data);

      refetch();
    } catch (e) {
      console.error(e);
    }
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

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'column',
    textAlign: 'center'
}

const cardStyle = {
    margin: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center'
}

const formStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '500px',
    padding: 15 
}
  return (
    <Container style={containerStyle}>
      <div className="profile-page">
        <Header className="">Please Add Your Dog's Profile Here</Header>
        <div style={cardStyle}>
          <Form style={formStyle} onSubmit={handleFormSubmitAdd}>
            <Form.Group widths='equal'>
              <Form.Field >
                <label>Pet Name</label>
                  <input
                    className=""
                    placeholder="Your pet name"
                    name="petName"
                    type="text"
                    value={addFormState.petName}
                    onChange={handleChangeAdd}
                  />
              </Form.Field>
              <Form.Field>
              <label>Pet Age</label>
                <input
                  className=""
                  placeholder="Your pet age"
                  name="age"
                  type="number"
                  value={addFormState.age}
                  onChange={handleChangeAdd}
                />
              </Form.Field>
              <Form.Field>
              <label>Pet Breed</label>
                <input
                  className=""
                  placeholder="Your pet breed"
                  name="breed"
                  type="text"
                  value={addFormState.breed}
                  onChange={handleChangeAdd}
                />
              </Form.Field>
              <Form.Field>
              <label>Pet Food Brand</label>
                <input
                  className=""
                  placeholder="Your pet food brand"
                  name="foodBrand"
                  type="text"
                  value={addFormState.foodBrand}
                  onChange={handleChangeAdd}
                />
              </Form.Field>
              <Form.Field>
              <label>Name of Human</label>
                <input
                  className=""
                  placeholder="Your pet human name"
                  name="humanName"
                  type="text"
                  value={addFormState.humanName}
                  onChange={handleChangeAdd}
                />
              </Form.Field>

              <Button primary centered
                className="profile-btn"
                style={{ cursor: "pointer" }}
                type="submit"
              >
                Add Profile
              </Button>
            </Form.Group>
          </Form>
          {addError && <div className="">{addError.message}</div>}
        </div>
      </div>
      <br /><br />
      <div className="">

        <div className="">
          {loading ? (
            <div>Loading profile...</div>
          ) : (
            data && data.profiles && data.profiles.length > 0 && 
            <div>
              <Header className="">Here is your lovely Dog's Profile List</Header>
              {data.profiles.map((profile, index) =>
                <Form style={{ padding: 20 }}
                  index={index}
                  key={profile._id} 
                  onSubmit={(event) => handleFormSubmitUpdate(index, event)}>
                  <Form.Group>
                    <Form.Field>
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
                      <input
                        className=""
                        placeholder="Your pet human name"
                        name="humanName"
                        type="text"
                        value={updateFormState[index].humanName}
                        onChange={(ev) => handleChangeUpdate(index, ev)}
                      />
                    </Form.Field>
                    <Button                      className="profile-btn"
                      style={{ cursor: "pointer", backgroundColor: 'red'}}
                      type="submit"
                    >
                      Update Profile
                    </Button>
                    <Button
                      className="profile-btn"
                      style={{ cursor: "pointer" }}
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
      </div>
    </Container>
  );
};

export default Profile;
