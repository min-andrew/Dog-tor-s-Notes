import React from 'react';

const InfoList = ({ info }) => {
  if (!info.length) {
    return <h3>No Information Yet</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {info &&
          info.map((info) => (
            <div key={info} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {info} <br />
                </h4>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default InfoList;