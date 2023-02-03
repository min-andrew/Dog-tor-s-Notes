const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        email: String
        profile: [ID!]
    }

    type Auth {
        token: ID!
        user: User
      }

    type Profile {
        _id: ID!
        petName: String!
        age: String!
        breed: String!
        foodBrand: String!
        humanName: String!
    }

    type VetNote {
      _id: ID
      appointmentDate: String!
      primaryConcern: String!
      onsetDate: String!
      otherConcerns: String
      profile: [Profile]
    }

    input savedNote {
      journal: String
      title: String
      noteId: String
      image: String
      authors: [String]
    }
    
    type Query {
      user: User
      profiles: [Profile]
      profile(_id: ID!): Profile
      vetNote: VetNote
    }

    type Mutation {
      addUser(username: String!, email: String!, password: String!): Auth
      addVetNote(vetNote: String!): VetNote
      addProfile(petName: String!, age: String!, breed: String!, foodBrand: String!, humanName: String!): Profile
      updateProfile(_id: ID!, petName: String!, age: String!, breed: String!, foodBrand: String!, humanName: String!): Profile
      removeProfile(profileId: ID!): Profile
      login(email: String!, password: String!): Auth
    }
`;
//profile: [Profile]
// Added the VetNotes, but left the rest . Wasn't clear about linking to the profile. Come back to this.
module.exports = typeDefs;
