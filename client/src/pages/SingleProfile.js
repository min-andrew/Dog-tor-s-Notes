import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_SINGLE_PROFILE } from "../utils/queries";
import { UPDATE_PROFILE, REMOVE_PROFILE } from "../utils/mutations.js";
import { Form, Button, Container, Header, Card } from "semantic-ui-react";

const SingleProfile = () => {
  const { profileId } = useParams();

  const { loading, data, refetch } = useQuery(QUERY_SINGLE_PROFILE, {
    // pass URL parameter
    variables: { profileId: profileId },
    onCompleted: (data) => setUpdateFormState(data.profile),
  });

  // State for Update Form
  const [updateFormState, setUpdateFormState] = useState({
    petName: "",
    age: "",
    breed: "",
    foodBrand: "",
    humanName: "",
  });

  const [updateProfile, { error: updateError }] = useMutation(UPDATE_PROFILE);

  const [removeProfile, { error: removeError }] = useMutation(REMOVE_PROFILE);

  const [hideState, setHideState] = useState({
    loadPage: {},
    update: {
      display: "none",
    },
  });

  const hider = async () => {
    setHideState({
      profile: {
        display: "none",
      },
      update: {
        display: "block",
      },
    });
  };

  const shower = async () => {
    setHideState({
      profile: {
        display: "block",
      },
      update: {
        display: "none",
      },
    });
  };

  // Update state based on Update Form input changes
  const handleChangeUpdate = (event) => {
    const { name, value } = event.target;

    setUpdateFormState({
      ...updateFormState,
      [name]: value,
    });
  };

  // Submit form for Update Profile
  const handleFormSubmitUpdate = async (event) => {
    event.preventDefault();
    console.log(updateFormState);

    try {
      const { data } = await updateProfile({
        variables: { ...updateFormState },
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

      window.location = "/#/profiles";
    } catch (e) {
      console.error(e);
    }
  };

  const profile = data?.profile || {};

  return loading ? (
    <div>Loading profile...</div>
  ) : profile ? (
    <Container>
      {/* --------------Diplays Single Profile---------- */}
      {
        <div className="note" style={hideState.profile}>
          <div className="note-card-container">
            <Card
              className="single-vet-card"
              style={{
                lineHeight: "1.5",
                textAlign: "center",
              }}
            >
              <Header textAlign={"center"}>Your Pet's Name</Header>
              {profile.petName}
              <Header textAlign={"center"}>Age</Header>
              {profile.age}
              <Header textAlign={"center"}>Breed</Header>
              {profile.breed}
              <Header textAlign={"center"}>Food Brand</Header>
              {profile.foodBrand}
              <Header textAlign={"center"}>Owner's Name</Header>
              {profile.humanName}
            </Card>
            <div className="column-btn-grp">
              <Button
                primary
                compact
                mini
                className="vet-note-nav-btns"
                onClick={hider}
              >
                Edit Profile
              </Button>
              <Link to="/profiles">
                <Button primary compact mini className="vet-note-nav-btns">
                  All Profiles
                </Button>
              </Link>
              <Link to="/">
                <Button primary compact mini className="vet-note-nav-btns">
                  Back Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      }
      {/* ----------------Edit Form------------------ */}
      <div className="edit-profile" style={hideState.update}>
        <div className="profile-update-heading">
          <Header as="h3">
            <span>{profile.petName}'s profile</span>
          </Header>
          <div className="update-profile-card">
            <Card
              className="update-profile-card"
              style={{
                lineHeight: "1.5",
                textAlign: "center",
              }}
            >
              <Form
                className="update-profile-card"
                style={{ padding: 10 }}
                key={profile._id}
                onSubmit={handleFormSubmitUpdate}
              >
                <Form.Group className="form-group">
                  <Form.Field className="profile-input">
                    {/* update field for pet name */}
                    <label>Pet Name</label>
                    <input
                      className=""
                      placeholder="Your pet name"
                      name="petName"
                      type="text"
                      value={updateFormState.petName}
                      onChange={handleChangeUpdate}
                    />
                  </Form.Field>
                  <Form.Field className="profile-input">
                    {/* update field for age of pet */}
                    <label>Age</label>
                    <input
                      className=""
                      placeholder="Your pet age"
                      name="age"
                      type="number"
                      value={updateFormState.age}
                      onChange={handleChangeUpdate}
                    />
                  </Form.Field>
                  <Form.Field className="profile-input">
                    {/* update field for pet breed */}
                    <label>Breed</label>
                    <input
                      className=""
                      placeholder="Your pet breed"
                      name="breed"
                      type="text"
                      value={updateFormState.breed}
                      onChange={handleChangeUpdate}
                    />
                  </Form.Field>
                  <Form.Field className="profile-input">
                    {/* update field for pet food brand */}
                    <label>Food Brand</label>
                    <input
                      className=""
                      placeholder="Your pet food brand"
                      name="foodBrand"
                      type="text"
                      value={updateFormState.foodBrand}
                      onChange={handleChangeUpdate}
                    />
                  </Form.Field>
                  <Form.Field className="profile-input">
                    {/* update field for owner name */}
                    <label>Owner's Name</label>
                    <input
                      className=""
                      placeholder="Owner's name"
                      name="humanName"
                      type="text"
                      value={updateFormState.humanName}
                      onChange={handleChangeUpdate}
                    />
                  </Form.Field>
                  {/* button for updating profile */}
                  <div className="single-btn-group">
                    <Button
                      compact
                      className="profile-btn"
                      style={{
                        cursor: "pointer",
                        backgroundColor: "rgb(83,149,202)",
                      }}
                      type="submit"
                      onClick={shower}
                    >
                      Update Profile
                    </Button>
                    {/* button for removing profile */}

                    <Button
                      compact
                      className="profile-btn"
                      style={{
                        cursor: "pointer",
                        backgroundColor: "red",
                      }}
                      type="button"
                      onClick={(ev) => handleFormRemove(profile._id, ev)}
                    >
                      Remove Profile
                    </Button>
                  </div>
                </Form.Group>
              </Form>
              {updateError && <div className="">{updateError.message}</div>}
              {removeError && <div className="">{removeError.message}</div>}
            </Card>
          </div>

          <div className="single-btn-group">
            <Link to="/">
              <Button primary mini className="vet-form-nav-btns">
                Home
              </Button>
            </Link>
            <Link to="/profiles">
              <Button primary mini className="vet-form-nav-btns">
                Back
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  ) : (
    <div>Go back to Home</div>
  );
};
export default SingleProfile;
