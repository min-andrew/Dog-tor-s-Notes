const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
    me: User
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
      }

    type Profile {
        _id: ID
        petName: String!
        age: String!
        breed: String!
        foodBrand: String!
        humanName: String!
    }

    type VetNotes {
        _id: ID
        primaryConcern: String
        onsetDate: String
        otherConcerns: String
        symptoms: String
  
      }

    input savedNote {
        journal: String
        title: String
        noteId: String
        image: String
        authors: [String]
      }

      type Mutation {
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
  
        updateUser(firstName: String, lastName: String, email: String, password: String): User
  
        login(email: String!, password: String!): Auth
      }
`;
//profile: [Profile]
// Added the VetNotes, but left the rest . Wasn't clear about linking to the profile. Come back to this.
module.exports = typeDefs;
