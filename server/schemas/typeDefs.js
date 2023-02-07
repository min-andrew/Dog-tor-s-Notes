const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        email: String
        profile: [Profile]
        vetNote: [VetNote]
    }

    type Auth {
        token: ID!
        user: User
      }

    type Profile {
        _id: ID!
        petName: String
        age: String
        breed: String
        foodBrand: String
        humanName: String
    }

    type VetNote {
      _id: ID
      petName: String
      appointmentDate: String
      primaryConcern: String
      onsetDate: String
      otherConcerns: String
      createdAt: String
    }
    
    type Habit {
      _id: ID
      habitName: String
      frequency: String
    }

    type Environment {
      cloudinaryApiName: String
    }

    type Query {
      user: User
      profiles: [Profile]
      vetNotes: [VetNote]
      profile(profileId:ID!): Profile
      vetNote(vetNoteId: ID!): VetNote
      getHabits: [Habit]
      environment: Environment
    }

    type Mutation {
      addUser(username: String!, email: String!, password: String!): Auth
      addVetNote(petName: String!, appointmentDate: String!, primaryConcern: String!, onsetDate: String!, otherConcerns: String): VetNote
      updateUser(username: String!, email: String, password: String): User
      addProfile(petName: String!, age: String!, breed: String!, foodBrand: String!, humanName: String!): Profile
      updateProfile(_id: ID!, petName: String!, age: String!, breed: String!, foodBrand: String!, humanName: String!): Profile
      removeProfile(profileId: ID!): Profile
      addHabit(habitName: String!, frequency: String!): Habit
      login(email: String!, password: String!): Auth
}

`;

module.exports = typeDefs;
