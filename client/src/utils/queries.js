import { gql } from '@apollo/client';

export const QUERY_SINGLE_PROFILE = gql`
  query allProfiles {
    profile {
      _id
      petName
      age
      breed
      foodBrand
      humanName
    }
  }
`;

export const QUERY_VETNOTES = gql`
  query allVetNotes {
    vetNote {
      _id
      appointmentDate
      primaryConcern
      onsetDate
      otherConcerns
    }
  }
`;