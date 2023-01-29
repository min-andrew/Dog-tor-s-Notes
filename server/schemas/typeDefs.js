const typeDefs = `#gql
    type Query {
    me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: savedBook!): User
        removeBook(bookId: ID!): User
    }

    type User {
        _id: ID!
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Note {
        noteId: String
        authors: [String]
        journal: String
        title: String
        image: String
    }

// Added the VetNotes, but left the rest
    type VetNotes. Wasn't clear about linking to the profile. Come back to this. {
        _id: ID
        primaryConcern: String
        onsetDate: String
        otherConcerns: String
        symptoms: String
        profile: [Profile]
      }

    input savedNote {
        journal: String
        title: String
        noteId: String
        image: String
        authors: [String]
      }
`;

module.exports = typeDefs;