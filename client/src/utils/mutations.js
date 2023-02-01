import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_INFO = gql`
  mutation addInfo($profileId: ID!, $info: String!) {
    addInfo(profileId: $profileId, info: $info) {
      _id
      name
      info
    }
  }
`;

export const ADD_VETNOTE = gql`
  mutation addVetNote($vetNoteId: ID!, $appointmentDate: String!, $primaryConcern: String!, $onsetDate: String!) {
    addInfo(vetNoteId: $vetNoteId, appointmentDate: $appointmentDate, primaryConcern: $primaryConcern, onsetDate: $onsetDate) {
      _id
      appointmentDate
      primaryConcern
      onsetDate
      otherConcerns
    }
  }
  `;