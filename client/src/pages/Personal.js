import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import SkillsList from '../components/SkillsList';
import SkillForm from '../components/SkillForm';

import { QUERY_SINGLE_PROFILE } from '../utils/queries';

const Personal = () => {
  const { personalId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
    variables: { personalId: personalId },
  });

  const personal = data?.personal || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2 className="card-header">
        {personal.name}'s friends have endorsed these skills...
      </h2>

      {personal.skills?.length > 0 && <SkillsList skills={personal.skills} />}

      <div className="my-4 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <SkillForm profileId={personal._id} />
      </div>
    </div>
  );
};

export default Profile;
