import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_INFO } from '../../utils/mutations';

import Auth from '../../utils/auth';

const InfoForm = ({ profileId }) => {
  const [info, setInfo] = useState('');

  const [addInfo, { error }] = useMutation(ADD_INFO);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await addInfo({
        variables: { profileId, info },
      });

      setInfo('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h4>Provide information about your best friend!</h4>

      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          <div className="col-12 col-lg-9">
            <input
              placeholder="Add quick reference info about your dog i.e. insurance info"
              value={info}
              className="form-input w-100"
              onChange={(event) => setInfo(event.target.value)}
            />
          </div>

          <div className="col-12 col-lg-3">
            <button className="btn btn-info btn-block py-3" type="submit">
              Confirm
            </button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </form>
      ) : (
        <p>
          You need to be logged in to view or add information. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default InfoForm;
