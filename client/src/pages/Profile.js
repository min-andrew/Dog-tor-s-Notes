import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import InfoList from '../components/InfoList/index.js';
import InfoForm from '../components/InfoForm';

import { QUERY_SINGLE_PROFILE } from '../utils/queries';

const Profile = () => {
  const { profileId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
    variables: { profileId: profileId },
  });

  const profile = data?.profile || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2 className="card-header">
        {profile.petName}'s information
      </h2>

      {profile.info?.length > 0 && <InfoList info={profile.info} />}

      <div className="my-4 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <InfoForm profileId={profile._id} />
      </div>
    </div>
  );
};

export default Profile;
