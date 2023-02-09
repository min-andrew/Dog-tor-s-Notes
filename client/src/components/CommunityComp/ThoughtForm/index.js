import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Container, Button } from 'semantic-ui-react'

import { ADD_THOUGHT } from '../../../utils/DiscussionUtils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../../../utils/DiscussionUtils/queries';

import Auth from '../../../utils/auth';

const ThoughtForm = () => {
  const [thoughtText, setThoughtText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    update(cache, { data: { addThought } }) {
      try {
        const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });

        cache.writeQuery({
          query: QUERY_THOUGHTS,
          data: { thoughts: [addThought, ...thoughts] },
        });

        // update me object's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addThought({
        variables: {
          thoughtText,
          thoughtAuthor: Auth.getProfile().data.username,
        },
      });

      setThoughtText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'thoughtText' && value.length <= 280) {
      setThoughtText(value);
      setCharacterCount(value.length);
    }
  };

  const buttonStyle = {
    width: '90%',
    display: 'flex',
    justifyContent: 'end'
  }

  return (
    <div>
      <Container>
        <>
          <form
            onSubmit={handleFormSubmit}
          >
            <div>
              <textarea
                name="thoughtText"
                placeholder="Here's a new thought..."
                value={thoughtText}
                style={{ lineHeight: '.5', resize: 'vertical', borderTop: 'none', borderLeft: 'none', borderRight: 'none', outline: 'none', width: '80%' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div style={buttonStyle}>
              <p
                className={`m-0 ${characterCount === 280 || error ? 'text-danger' : ''
                  }`}
                style={{ marginRight: '5px' }}
              >
                Character Count: {characterCount}/280
              </p>
              <Button primary mini type="submit">
                Add Thought
              </Button>
            </div>
            {error && (
              <div>
                {error.message}
              </div>
            )}
          </form>
        </>
      </Container>
    </div>
  );
};

export default ThoughtForm;
