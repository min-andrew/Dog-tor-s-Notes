import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { REMOVE_THOUGHT } from '../../../utils/DiscussionUtils/mutations';
import { useMutation } from '@apollo/client';


const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {

  const [removeThought, { error: removeError }] = useMutation(REMOVE_THOUGHT);


  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  // Handle Button click for Remove Thought
  const handleFormRemove = async (id, event) => {
    event.preventDefault();

    try {
      const { data } = await removeThought({
        variables: { thoughtId: id },
      });
      console.log(data);

      window.location.reload(false);
    } catch (e) {
      console.error(e);
    }
  };

  const cardStyle = {
    width: '80%'
  }

  const mainStyle = {
    textAlign: "-webkit-center",
    paddingTop: '17px',
    paddingBottom: '10px'
  }

  const style = {
    marginBottom: '5px',
    fontSize: 'small'
  }

  const commentStyle = {
    marginBottom: '3px'
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {thoughts &&
        thoughts.map((thought) => (
          <div style={mainStyle} key={thought._id}>
            <h4 style={commentStyle}>
              {showUsername ? (
                <span>
                  {thought.thoughtAuthor} <span> </span>
                  <span style={{ fontSize: '0.825rem', color: 'gray' }}>
                    {thought.createdAt}
                  </span>
                </span>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this thought on {thought.createdAt}
                  </span>
                  <button
                    style={{ cursor: "pointer", borderRadius: '50%', background: 'none', border: 'none', color: 'red' }}
                    type="button"
                    onClick={(ev) => handleFormRemove(thought._id, ev)}
                  >
                    X
                  </button>
                  {removeError && <div>{removeError.message}</div>}
                </>

              )}
            </h4>
            <div style={style}>
              <p>{thought.thoughtText}</p>
            </div >
            <Link
              to={`/SingleThought/${thought._id}`}
            >
              <Icon enabled name='comment outline' size='mid' />
              Comments
            </Link>
          </div>
        ))}
    </div >
  );
};

export default ThoughtList;
