import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Container, Form, Checkbox, Header} from 'semantic-ui-react';
import { ADD_HABIT } from '../utils/mutations';

const HabitForm = () => {
 
    const [formState, setFormState] = useState({
        habitName: '',

    })

    const [addHabit] = useMutation(ADD_HABIT)
    
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
          const { data, error } = await addHabit({
            variables: { ...formState },
          });
          setFormState({
            habitName: "",


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
                  onChange={handleChange}
                  placeholder="ex. Walk, Check Up, Feed, etc."
                />
              </Form.Field>
     <div className='checkBox'>     
              <Form.Field>
        <Checkbox className='habit-checks' style={labelStyle}
          radio
          label='Daily'
          name='frequency'
          value={formState.frequency}
          checked={formState === 'daily'}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox style={labelStyle}
          radio
          label='Weekly'
          name='frequency'
          value={formState.frequency}
          checked={formState === 'Weekly'}
          onChange={handleChange}
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