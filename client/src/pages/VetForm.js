import React, { useState } from 'react';
import { Form, Button, TextArea, Container, Header, Card} from 'semantic-ui-react'
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

  const [addVetNote] = useMutation(ADD_VETNOTE);

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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
}

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
    display: 'block',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 15 
}
 const labelStyle = {
  fontSize: '.92857143em',
  fontWeight: 700,
  textAlign: 'center'
 }

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
  }
  return (
   
    <Container style={containerStyle}>
    
      <Header style={headerStyle}>Veterinary Notes</Header>
        <p className='vet-text'>Make notes to prepare for your upcoming appointment.<br/>
          Record notes once the appointment is done.<br/>
          Save them to your record for future reference.
        </p>
        <Card style={cardStyle} className='vet-card'>
        <Form style={formStyle}>
            <Form.Group widths='equal'>
            <Form.Field className='vet-field'>
                <label>Pet Name</label>
                <input 
                  value={formState.petName}
                  name="petName"
                  onChange={handleChange}
                  placeholder="Your pet name..."
                />
                </Form.Field>

              <Form.Field className='vet-field'>
              <label>Appointment Date</label>
                <input
                  value={formState.appointmentDate}
                  name="appointmentDate"
                  onChange={handleChange}
                  placeholder="ex. 10/24/2023 or TBD"
                  className='input-field'
                />
              </Form.Field>

              <Form.Field className='vet-field'>
                <label>Primary Concern</label>
                <input
                  value={formState.primaryConcern}
                  name="primaryConcern"
                  onChange={handleChange}
                  placeholder="Primary Concern(s)"
                />
                </Form.Field>

                <Form.Field className='vet-field'>
                <label>Date of Onset</label>
                <input
                  value={formState.onsetDate}
                  name="onsetDate"
                  onChange={handleChange}
                  placeholder="Approximate date of symptom onset"
                />
                </Form.Field>  

                <label style={labelStyle}>Other Concerns</label>
                <TextArea rows={4} placeholder="Diet, new behaviors, dental issues, etc." value={formState.otherConcerns}
                  name="otherConcerns"
                  onChange={handleChange} />         
            </Form.Group>
            <Button circular icon='paw' type='submit' onClick={handleFormSubmit} className='paw-button'></Button> 
       
        </Form>
      </Card>

      </Container>
  );
};
 

export default VetForm;