const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        email: String
        profile: [Profile]
        vetNote: [VetNote]
        thoughts: [Thought]!
    }

    type Thought {
      _id: ID
      thoughtText: String
      thoughtAuthor: String
      createdAt: String
      comments: [Comment]!
    }
  
    type Comment {
      _id: ID
      commentText: String
      commentAuthor: String
      createdAt: String
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
        microchip: String
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
      environment: Environment
      thoughts(username: String): [Thought]
      thought(thoughtId: ID!): Thought
      me: User
      users: [User]
    }

    type Mutation {
      addUser(username: String!, email: String!, password: String!): Auth
      addVetNote(petName: String!, appointmentDate: String!, primaryConcern: String!, onsetDate: String!, otherConcerns: String): VetNote
      updateVetNote(_id: ID!, petName: String!, appointmentDate: String!, primaryConcern: String!, onsetDate: String!, otherConcerns: String): VetNote
      removeVetNote(vetNoteId: ID!): VetNote
      updateUser(username: String!, email: String, password: String): User
      addProfile(petName: String!, age: String!, breed: String!, microchip: String, foodBrand: String!, humanName: String!): Profile
      updateProfile(_id: ID!, petName: String!, age: String!, breed: String!, microchip: String, foodBrand: String!, humanName: String!): Profile
      removeProfile(profileId: ID!): Profile
      addHabit(habitName: String!, frequency: String!): Habit
      login(email: String!, password: String!): Auth
      addThought(thoughtText: String!): Thought
      addComment(thoughtId: ID!, commentText: String!): Thought
      removeThought(thoughtId: ID!): Thought
      removeComment(thoughtId: ID!, commentId: ID!): Thought
}

`;

module.exports = typeDefs;
