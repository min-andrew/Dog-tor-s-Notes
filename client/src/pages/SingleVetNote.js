import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ONE_VETNOTE } from "../utils/queries";
import { UPDATE_VETNOTE, REMOVE_VETNOTE } from "../utils/mutations";
import { Button, Container, Header, Card, Form } from "semantic-ui-react";

const SingleVetNote = () => {
  const { vetNoteId } = useParams();

  const { loading, data, refetch } = useQuery(QUERY_ONE_VETNOTE, {
    // pass URL parameter
    variables: { vetNoteId: vetNoteId },
    onCompleted: (data) => setUpdateFormState(data.vetNote),
  });

  const [updateVetNote, { error: updateError }] = useMutation(UPDATE_VETNOTE);

  const [removeVetNote, { error: removeError }] = useMutation(REMOVE_VETNOTE);

  const [updateFormState, setUpdateFormState] = useState({
    petName: "",
    appointmentDate: "",
    primaryConcern: "",
    onsetDate: "",
    otherConcerns: "",
  });

  const [hideState, setHideState] = useState({
    loadPage: {},
    update: {
      display: "none",
    },
  });

  const hider = async () => {
    setHideState({
      vetNote: {
        display: "none",
      },
      update: {
        display: "block",
      },
    });
  };

  const shower = async () => {
    setHideState({
      vetNote: {
        display: "block",
      },
      update: {
        display: "none",
      },
    });
  };

  const handleChangeUpdate = (event) => {
    const { name, value } = event.target;

    setUpdateFormState({
      ...updateFormState,
      [name]: value,
    });
  };

  const handleFormSubmitUpdate = async (event) => {
    event.preventDefault();
    console.log(updateFormState);

    try {
      const { data } = await updateVetNote({
        variables: { ...updateFormState },
      });
      console.log(data);

      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  // Handle Button click for Remove VetNote
  const handleFormRemove = async (id, event) => {
    event.preventDefault();

    try {
      const { data } = await removeVetNote({
        variables: { vetNoteId: id },
      });
      console.log(data);

      window.location = "/#/VetNotes";
    } catch (e) {
      console.error(e);
    }
  };

  const vetNote = data?.vetNote || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      {
        <div className="note" style={hideState.vetNote}>
          <div className="note-card-container">
            <Card
              className="single-vet-card"
              style={{
                lineHeight: "1.5",
                textAlign: "center",
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
            <div className="column-btn-grp">
              <Button
                primary
                compact
                mini
                className="vet-note-nav-btns"
                onClick={hider}
              >
                Edit Note
              </Button>
              <Link to="/vetnotes">
                <Button primary compact mini className="vet-note-nav-btns">
                  All Vet Notes
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

      {/* ------------------------------------- */}
      <div className="edit-profile" style={hideState.update}>
        <div className="profile-update-heading">
          <Header as="h3">
            <span>{vetNote.petName}'s Vet Note</span>
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
                key={vetNote._id}
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
                    <label>Appointment Date</label>
                    <input
                      className=""
                      placeholder="October 24, 2023"
                      name="appointmentDate"
                      type="text"
                      value={updateFormState.appointmentDate}
                      onChange={handleChangeUpdate}
                    />
                  </Form.Field>
                  <Form.Field className="profile-input">
                    {/* update field for pet breed */}
                    <label>Primary Concern</label>
                    <input
                      className=""
                      placeholder="Sore back legs"
                      name="primaryConcern"
                      type="text"
                      value={updateFormState.primaryConcern}
                      onChange={handleChangeUpdate}
                    />
                  </Form.Field>
                  <Form.Field className="profile-input">
                    {/* update field for pet food brand */}
                    <label>Date of Symptom Onset</label>
                    <input
                      className=""
                      placeholder="Last month"
                      name="onsetDate"
                      type="text"
                      value={updateFormState.onsetDate}
                      onChange={handleChangeUpdate}
                    />
                  </Form.Field>
                  <Form.Field className="profile-input">
                    {/* update field for owner name */}
                    <label>Other Concerns</label>
                    <input
                      className=""
                      placeholder="Dog hasn't been eating."
                      name="otherConcerns"
                      type="text"
                      value={updateFormState.otherConcerns}
                      onChange={handleChangeUpdate}
                    />
                  </Form.Field>
                  {/* button for updating note */}
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
                      Update Note
                    </Button>
                    {/* button for removing note */}

                    <Button
                      compact
                      className="profile-btn"
                      style={{
                        cursor: "pointer",
                        backgroundColor: "red",
                      }}
                      type="button"
                      onClick={(ev) => handleFormRemove(vetNote._id, ev)}
                    >
                      Remove Note
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
            <Link to="/vetnotes">
              <Button primary mini className="vet-form-nav-btns">
                Back
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SingleVetNote;
