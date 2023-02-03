import { gql } from '@apollo/client';

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(_id: $profileId) {
      _id
      petName
      age
      breed
      foodBrand
      humanName
    }
  }  
`;

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
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

export const QUERY_GET_HABITS = gql`
  query allHabits {
    habit {
      _id
      habitName
      frequency
      complete
    }
  }
`;