import { gql } from '@apollo/client';

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

export const QUERY_VETNOTES = gql`
  query allVetNotes {
    vetNotes {
      _id
      petName
      appointmentDate
      primaryConcern
      onsetDate
      otherConcerns
      createdAt
    }
  }
`;

export const QUERY_ONE_VETNOTE = gql`
  query oneVetNote($vetNoteId: ID!) {
    vetNote(vetNoteId: $vetNoteId) {
      _id
      petName
      appointmentDate
      primaryConcern
      onsetDate
      otherConcerns
      createdAt
    }
  }
`;

export const QUERY_GET_HABITS = gql`
  query allHabits {
    habit {
      _id
      habitName
      frequency
    }
  }
`;

export const QUERY_GET_ENV = gql`
  { 
    environment {
      cloudinaryApiName
    }
  }
`;