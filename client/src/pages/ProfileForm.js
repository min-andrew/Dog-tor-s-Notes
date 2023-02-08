import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { Form, Button, Container, Header } from "semantic-ui-react";
import { ADD_PROFILE } from "../utils/mutations.js";

const Profile = () => {
  // State for Add Form
  const [addFormState, setAddFormState] = useState({
    petName: "",
    age: "",
    breed: "",
    foodBrand: "",
    humanName: "",
  });

  // Post profile data
  const [addProfile, { error: addError }] = useMutation(ADD_PROFILE);

  // Update state based on Add Form input changes
  const handleChangeAdd = (event) => {
    const { name, value } = event.target;

    setAddFormState({
      ...addFormState,
      [name]: value,
    });
  };

  // Submit form for Add Profile
  const handleFormSubmitAdd = async (event) => {
    event.preventDefault();
    console.log(addFormState);

    try {
      const { data } = await addProfile({
        variables: { ...addFormState },
      });
      setAddFormState({
        petName: "",
        age: "",
        breed: "",
        foodBrand: "",
        humanName: "",
      });

      window.location = "/#/profiles";
    } catch (e) {
      console.error(e);
    }
  };
  // styling
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "column",
    textAlign: "center",
  };

  const cardStyle = {
    margin: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
  };

  const formStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "500px",
    padding: 20,
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  };

  return (
    <Container style={containerStyle}>
      <div className="profile-page">
        <Header style={headerStyle} className="">
          Add Your Dog's Profile Here
        </Header>
        <div style={cardStyle}>
          <Form style={formStyle} onSubmit={handleFormSubmitAdd}>
            <Form.Group widths="equal">
              <Form.Field>
                {/* input for pet name */}
                <label>Pet Name</label>
                <input
                  placeholder="Pet Name"
                  name="petName"
                  type="text"
                  value={addFormState.petName}
                  onChange={handleChangeAdd}
                />
              </Form.Field>
              {/* input for pet's age */}
              <Form.Field>
                <label>Pet Age</label>
                <input
                  placeholder="Pet Age"
                  name="age"
                  type="number"
                  value={addFormState.age}
                  onChange={handleChangeAdd}
                />
              </Form.Field>
              <Form.Field>
                {/* input for dog breed */}
                <label>Breed of Your Pet</label>
                <input
                  placeholder="Breed"
                  name="breed"
                  type="text"
                  value={addFormState.breed}
                  onChange={handleChangeAdd}
                />
              </Form.Field>
              <Form.Field>
                {/* input for pet food brand */}
                <label>Brand of Pet Food</label>
                <input
                  placeholder="Brand of Pet Food"
                  name="foodBrand"
                  type="text"
                  value={addFormState.foodBrand}
                  onChange={handleChangeAdd}
                />
              </Form.Field>
              <Form.Field>
                {/* input for owner's name */}
                <label>Owner's name</label>
                <input
                  placeholder="Owner's name"
                  name="humanName"
                  type="text"
                  value={addFormState.humanName}
                  onChange={handleChangeAdd}
                />
              </Form.Field>
            </Form.Group>
          </Form>
          <div>{addError && <div>{addError.message}</div>}</div>
        </div>
        <div className="vet-form-btn-grp"></div>
        <Button
          primary
          className="vet-form-nav-btns"
          style={{ cursor: "pointer", margin: 8 }}
          type="submit"
          onClick={handleFormSubmitAdd}
        >
          Add Profile
        </Button>

        <Link to="/profiles">
          <Button primary className="vet-form-nav-btns">
            Back to Profiles
          </Button>
        </Link>

        <Link to="/">
          <Button primary className="vet-form-nav-btns">
            Back Home
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default Profile;
