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
  mutation addVetNote($vetNoteId: ID!, $appointmentDate: String!, $primaryConcern: String!, $onsetDate: String!) {
    addVetNote(vetNoteId: $vetNoteId, appointmentDate: $appointmentDate, primaryConcern: $primaryConcern, onsetDate: $onsetDate, otherConcerns: $otherConcerns) {
      _id
      appointmentDate
      primaryConcern
      onsetDate
      otherConcerns
    }
  }
  `;

export const ADD_PROFILE = gql`
  mutation addProfile($petName: String!, $age: String!, $breed: String!, $foodBrand: String!, $humanName: String!) {
    addProfile(petName: $petName, age: $age, breed: $breed, foodBrand: $foodBrand, humanName: $humanName) {
      _id
      petName
      age
      breed
      foodBrand
      humanName
    }
  }
  `;

export const UPDATE_PROFILE = gql`
  mutation updateProfile($_id: ID!, $petName: String!, $age: String!, $breed: String!, $foodBrand: String!, $humanName: String!) {
    updateProfile(_id: $_id, petName: $petName, age: $age, breed: $breed, foodBrand: $foodBrand, humanName: $humanName) {
      _id
      petName
      age
      breed
      foodBrand
      humanName
    }
  }
`;

export const REMOVE_PROFILE = gql`
  mutation removeProfile($profileId: ID!) {
    removeProfile(profileId: $profileId) {
      _id
      petName
      age
      breed
      foodBrand
      humanName
    }
  }
`;

export const ADD_HABIT = gql`
  mutation addHabit($Id: ID!, $habitName: String!, $frequency: String!, $complete: Boolean!) {
    addHabit(Id: $Id, habitName: $habitName, frequency: $frequency, complete: $complete) {
      _id
      habitName
      frequency
      complete
    }
  }
`;
