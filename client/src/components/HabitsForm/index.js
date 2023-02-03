import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Container, Segment, Dropdown, Form } from 'semantic-ui-react';
import { ADD_HABIT } from '../../utils/mutations';



const Habits = () => {
 
    const [habit, setHabit] = useState({
        habitName: '',
        frequency: '',
        complete: ''
    })

    const [addHabit] = useMutation(ADD_HABIT)
    
    const handleChange = (e) => {
        // Getting the value and name of the input which triggered the change
        const { name, value } = e.target;
    
        setHabit({
          ...habit,
          [name]: value,
        });
      };

      const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
          const { data } = await addHabit({
            variables: { ...habit },
          });
          
        } catch (e) {
          console.error(e);
        }
      }

    const frequencyOptions = [
        {
          key: 'Daily',
          text: 'Daily',
          value: 'Daily',
        },
        {
            key: 'Weekly',
            text: 'Weekly',
            value: 'Weekly',
        },
        {
            key: 'Monthly',
            text: 'Monthly',
            value: 'Monthly',
        },
        {
            key: 'Yearly',
            text: 'Yearly',
            value: 'Yearly',
        },
    ]
return (
    <Container>
      <Segment basic textAlign={"center"}>
        <Form>
            <Form.Group widths='equal' heights='equal'>

              <Form.Field >
              <label>Habit</label>
                <input
                  value={habit.habitName}
                  name="habitName"
                  onChange={handleChange}
                  placeholder="ex. Walk, Check Up, Feed, etc."
                />
              </Form.Field>
             
            <Dropdown size='small' id='habitDrop'
                placeholder='Select Frequency'
                fluid
                selection
                options={frequencyOptions}
            />
            </Form.Group>
            </Form>

            <Button circular icon='paw' type='submit' onClick={handleFormSubmit}></Button>

      </Segment>
    </Container>
  );
};
export default Habits;