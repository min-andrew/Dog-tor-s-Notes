import React from 'react';

const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

  const style = {
    marginTop: '5px',
  }

  const commentStyle = {
    marginTop: '15px',
    marginBottom: '3px'
  }

  return (
    <>
      <div>
        {comments &&
          comments.map((comment) => (
            <div key={comment._id}>
              <div style={style}>
                <h5 style={commentStyle}>
                  {comment.commentAuthor}{' '}
                  <span style={{ fontSize: '0.825rem', color: 'gray' }}>
                    {comment.createdAt}
                  </span>
                </h5>
                <p>{comment.commentText}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList;
