import React, { useState } from 'react';
// import './style.css';
import Symptoms from '../Checkbox';

function VetForm() {
  // Here we set state variables using `useState` TODO: Should we use a text field for Onset or a date field?
  const [primaryConcern, setPrimaryConcern] = useState('');
  const [onsetDate, setOnsetDate] = useState('');
  const [otherConcerns, setOtherConcerns] = useState('');


  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = e.target;

  };

  const handleFormSubmit = (e) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    e.preventDefault();

    // Clear the inputs
    setPrimaryConcern('');
    setOnsetDate('');
    setOtherConcerns('');
  };

  return (
    <div>
      <form className="vet-form">
        <input
          value={primaryConcern}
          name="primaryConcern"
          onChange={handleInputChange}
          type="text"
          placeholder="Primary Concern(s)"
        />
        <input
          value={onsetDate}
          name="onsetDate"
          onChange={handleInputChange}
          type="text"
          placeholder="Approximate date of symptom onset"
        />
         <Symptoms/>
         <input
          value={otherConcerns}
          name="otherConcerns"
          onChange={handleInputChange}
          type="text"
          placeholder="Other concerns"
        />
        <button type="button" onClick={handleFormSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default VetForm;