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

    type Auth {
        token: ID!
        user: User
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