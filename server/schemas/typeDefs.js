const typeDefs = `#gql
    type Query {
    me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveNote(input: savedNote!): User
        removeNote(NoteId: ID!): User
    }

    type User {
        _id: ID!
        username: String
        email: String
        notes: [Note]
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
`;
//profile: [Profile]
// Added the VetNotes, but left the rest . Wasn't clear about linking to the profile. Come back to this.
module.exports = typeDefs;
