import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Container, Segment, Form, Checkbox} from 'semantic-ui-react';
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
   
return (
    <Container>
      <Segment basic textAlign={"center"}>
        <Form>
            <Form.Group widths='equal' heights='equal'>

              <Form.Field >
              <label>Habit</label>
                <input
                  name="habitName"
                  onChange={handleChange}
                  placeholder="ex. Walk, Check Up, Feed, etc."
                />
              </Form.Field>
             
              <Form.Field>
        <Checkbox
          radio
          label='Daily'
          name='frequency'
          value={formState.frequency}
          checked={formState === 'daily'}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          radio
          label='Weekly'
          name='frequency'
          value={formState.frequency}
          checked={formState === 'Weekly'}
          onChange={handleChange}
        />
      </Form.Field>
            </Form.Group>
            </Form>

            <Button circular icon='paw' type='submit' onClick={handleFormSubmit}></Button>

      </Segment>
    </Container>
  );
};
export default HabitForm;