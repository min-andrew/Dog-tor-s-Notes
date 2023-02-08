import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, TextArea, Container, Header } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { ADD_VETNOTE } from "../utils/mutations";

const VetForm = () => {
  const [formState, setFormState] = useState({
    petName: "",
    appointmentDate: "",
    primaryConcern: "",
    onsetDate: "",
    otherConcerns: "",
  });

  const [addVetNote, { error, data }] = useMutation(ADD_VETNOTE);

  const handleChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = e.target;
    console.log("From handleChange", name, value);
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  };

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
    display: "block",
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
    padding: 15,
  };
  const labelStyle = {
    fontSize: ".92857143em",
    fontWeight: 700,
    textAlign: "center",
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await addVetNote({
        variables: { ...formState },
      });
      setFormState({
        petName: "",
        appointmentDate: "",
        primaryConcern: "",
        onsetDate: "",
        otherConcerns: "",
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Container style={containerStyle}>
      <Header style={headerStyle}>Veterinary Notes</Header>
      <p className="vet-text">
        Make notes to prepare for your upcoming appointment.
        <br />
        Record notes once the appointment is done.
        <br />
        Save them to your record for future reference.
      </p>
      <div style={cardStyle} className="vet-div">
        <Form style={formStyle}>
          <Form.Group widths="equal">
            <Form.Field className="vet-field" required>
              <label>Pet Name</label>
              <Form.Input
                value={formState.petName}
                name="petName"
                onChange={handleChange}
                placeholder="Your pet name..."
              />
            </Form.Field>

            <Form.Field className="vet-field" required>
              <label>Appointment Date</label>
              <input
                value={formState.appointmentDate}
                name="appointmentDate"
                onChange={handleChange}
                placeholder="ex. 10/24/2023 or TBD"
                className="input-field"
              />
            </Form.Field>

            <Form.Field className="vet-field" required>
              <label>Primary Concern</label>
              <input
                value={formState.primaryConcern}
                name="primaryConcern"
                onChange={handleChange}
                placeholder="Primary Concern(s)"
              />
            </Form.Field>

            <Form.Field className="vet-field" required>
              <label>Date of Onset</label>
              <input
                value={formState.onsetDate}
                name="onsetDate"
                onChange={handleChange}
                placeholder="Approximate date of symptom onset"
              />
            </Form.Field>

            <label style={labelStyle}>Other Concerns</label>
            <TextArea
              rows={4}
              placeholder="Diet, new behaviors, dental issues, etc."
              value={formState.otherConcerns}
              name="otherConcerns"
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </div>
      <div>{error && <div>{error.message}</div>}</div>

      <div className="vet-form-btn-grp">
        <Button
          primary
          className="vet-form-nav-btns"
          type="submit"
          onClick={handleFormSubmit}
        >
          Submit Vet Note{" "}
        </Button>

        <Link to="/vetNotes">
          <Button primary className="vet-form-nav-btns">
            Back to Vet Notes
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

export default VetForm;
