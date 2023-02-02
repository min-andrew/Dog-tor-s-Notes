const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
    user: User
    profile: Profile
    vetNote: VetNote
    }

    type User {
        _id: ID!
        username: String
        email: String
        profile: [Profile]
    }

    type Auth {
        token: ID!
        user: User
        profile: [Profile]
      }

    type Profile {
        _id: ID
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

      type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        addVetNote(vetNote: String!): VetNote
        updateUser(username: String!, email: String, password: String): User
  
        login(email: String!, password: String!): Auth
      }
`;

// TODO: Added the VetNotes, but left the rest . Wasn't clear about linking to the profile. Come back to this.
module.exports = typeDefs;
