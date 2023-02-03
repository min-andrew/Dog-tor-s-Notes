import React, { useState } from 'react';
import { Form, Button, TextArea, Container, Segment } from 'semantic-ui-react'
import { useMutation } from "@apollo/client";
import { ADD_VETNOTE } from "../utils/mutations";

  const VetForm = () => {
    const [formState, setFormState] = useState({
      appointmentDate: "",
      primaryConcern: "",
      onsetDate: "",
      otherConcerns: "",
    });

  const [addVetNote] = useMutation(ADD_VETNOTE);

  const handleChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addVetNote({
        variables: { ...formState },
      });
      
    } catch (e) {
      console.error(e);
      // TODO: Clear inputs?
    }
  }
  return (
    <Container>
      <Segment basic textAlign={"center"}>
        <Form>
            <Form.Group widths='equal'>

              <Form.Field>
              <label>Appointment Date</label>
                <input
                  value={formState.appointmentDate}
                  name="appointmentDate"
                  onChange={handleChange}
                  placeholder="ex. 10/24/2023 or TBD"
                />
              </Form.Field>

              <Form.Field>
                <label>Primary Concern</label>
                <input
                  value={formState.primaryConcern}
                  name="primaryConcern"
                  onChange={handleChange}
                  placeholder="Primary Concern(s)"
                />
                </Form.Field>

                <Form.Field>
                <label>Date of Onset</label>
                <input
                  value={formState.onsetDate}
                  name="onsetDate"
                  onChange={handleChange}
                  placeholder="Approximate date of symptom onset"
                />
                </Form.Field>  

                <label>Other Concerns</label>
                <TextArea rows={6} placeholder="Diet, new behaviors, dental issues, etc." value={formState.otherConcerns}
                  name="otherConcerns"
                  onChange={handleChange} />
                            
            </Form.Group>
            
            <Button circular icon='paw' type='submit' onClick={handleFormSubmit}></Button>
        </Form>
      </Segment>
    </Container>
  );
};
 

export default VetForm;