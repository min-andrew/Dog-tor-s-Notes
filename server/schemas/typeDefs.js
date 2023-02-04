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
        vetNote: [VetNote]
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
      complete: Boolean
      profile: [Profile]
    }

    type Query {
      user: User
      profiles: [Profile]
      profile(_id: ID!): Profile
      vetNote: VetNote
      getHabits: [Habit]
    }

      type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        addVetNote(petName: String!, appointmentDate: String!, primaryConcern: String!, onsetDate: String, otherConcerns: String): VetNote
        updateUser(username: String!, email: String, password: String): User
        addProfile(petName: String!, age: String!, breed: String!, foodBrand: String!, humanName: String!): Profile
        updateProfile(_id: ID!, petName: String!, age: String!, breed: String!, foodBrand: String!, humanName: String!): Profile
        removeProfile(profileId: ID!): Profile
        addHabit(habitName: String!, frequency: String!, complete: Boolean!): Habit
        login(email: String!, password: String!): Auth
}

`;

// TODO: Added the VetNotes, but left the rest . Wasn't clear about linking to the profile. Come back to this.
module.exports = typeDefs;
