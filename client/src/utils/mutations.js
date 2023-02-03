import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
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
  mutation addVetNote($petName: String!, $appointmentDate: String!, $primaryConcern: String!, $onsetDate: String!, $otherConcerns: String) {
    addVetNote(petName: $petName, appointmentDate: $appointmentDate, primaryConcern: $primaryConcern, onsetDate: $onsetDate, otherConcerns: $otherConcerns) {
      _id
      petName
      appointmentDate
      primaryConcern
      onsetDate
      otherConcerns
    }
  }
  `;

  export const ADD_HABIT = gql`
  mutation addHabit($habitName: String!, $frequency: String!, $complete: Boolean!) {
    addHabit(habitName: $habitName, frequency: $frequency, complete: $complete) {
      _id
      habitName
      frequency
      complete
    }
  }
  `;