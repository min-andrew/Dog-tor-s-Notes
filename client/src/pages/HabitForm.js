import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Container, Form, Checkbox, Header} from 'semantic-ui-react';
import { ADD_HABIT } from '../utils/mutations';

const HabitForm = () => {
 
    const [formState, setFormState] = useState({
        habitName: '',
        daily: false,
        weekly: false,
        monthly: false,
        yearly: false
    })
    
       const [addHabit] = useMutation(ADD_HABIT)
    
    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;
    
        setFormState( (prevState) => {
          return {
          ...prevState,
          [name]: type === 'checkbox' ? checked : value
          }
          })
          }
         

      const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
          const { data, error } = await addHabit({
            variables: { ...formState },
          });
          setFormState({
            habitName: "",
            daily: false,
            weekly: false,
            monthly: false,
            yearly: false
            });  
        } catch (e) {
          console.error(e);
        }
      }

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
      
      const formStyle = {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '500px',
        padding: 15 
      }
     
       const labelStyle = {
        fontSize: '.92857143em',
        fontWeight: 700,
      }

  return (
    <Container style={containerStyle}>

      <Header style={headerStyle}>Habit Tracker</Header>
        <p className='vet-text'>Is there anything you'd like to remember to do more often?<br/>
          Daily walks? Medication schedule? Feedings?<br/>
          Create the habit below and see reminders on your homepage.
        </p>
        <Form style={formStyle}>
            <Form.Group widths='equal' heights='equal'>

              <Form.Field >
              <label>Habit</label>
                <input
                  name="habitName"
                  type="text"
                  onInput={handleChange}
                  placeholder="ex. Walk, Check Up, Feed, etc."
                  value={formState.habitName}
                />
              </Form.Field>

     <div className='checkBox'>  
              <Form.Field>
        <Checkbox radio htmlFor='daily' className='habit-checks' style={labelStyle}
      
          label='Daily'
          type='checkbox'
          name="checkboxRadioGroup"
          id='daily' 
          checked={formState.daily}
          onChange={(e, data) => setFormState(data.formState)}
        />
      </Form.Field>

      <Form.Field>
      <Checkbox radio htmlFor='weekly' className='habit-checks' style={labelStyle}
      
      label='Weekly'
      type='checkbox'
      name="checkboxRadioGroup"
      id='weekly' 
      checked={formState.weekly}
      onChange={(e, data) => setFormState(data.formState)}
        />
      </Form.Field>

      <Form.Field>
      <Checkbox radio htmlFor='monthly' className='habit-checks' style={labelStyle}
      
      label='Monthly'
      type='checkbox'
      name="checkboxRadioGroup"
      id='monthly' 
      checked={formState.monthly}
      onChange={(e, data) => setFormState(data.formState)}
        />
      </Form.Field>

      <Form.Field>
      <Checkbox radio htmlFor='yearly' className='habit-checks' style={labelStyle}
      
      label='Yearly'
      type='checkbox'
      name="checkboxRadioGroup"
      id='yearly' 
      checked={formState.yearly}
      onChange={(e, data) => setFormState(data.formState)}
        />
      </Form.Field>
      </div> 
            </Form.Group>
            </Form>

            <Button className='paw-button' circular icon='paw' type='submit' onClick={handleFormSubmit}></Button>
    </Container>
  );
};
export default HabitForm;