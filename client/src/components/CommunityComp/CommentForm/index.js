import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Card, Button } from 'semantic-ui-react'

import { ADD_COMMENT } from '../../../utils/DiscussionUtils/mutations';

import Auth from '../../../utils/auth';

const CommentForm = ({ thoughtId }) => {
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          thoughtId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  const cardStyle = {
    width: '80%'
  }

  const mainStyle = {
    textAlign: "-webkit-center"
  }

  const buttonStyle = {
    width: '80%',
    display: 'flex',
    justifyContent: 'end'
  }

  return (
    <div style={mainStyle}>
      {Auth.loggedIn() ? (
        <>
          <form
            onSubmit={handleFormSubmit}
          >
            <div>
              <textarea
                name="commentText"
                placeholder="Add your comment..."
                value={commentText}
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
                {error && <span>{error.message}</span>}
              </p>
              <div>
                <Button primary mini type="submit">
                  Add Comment
                </Button>
              </div>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CommentForm;
