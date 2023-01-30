const { User } = require("../models/index");
const { signToken } = require("../utils/auth");
const { GraphQLError } = require("graphql");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (!context.user)
                throw new GraphQLError("Error, please login into the query", {
                    extensions: { code: 'UNCATHENTICATED' },
                });
            return await User.findById(context.user._id).populate("books");
        },
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            //check email 
            const user = await User.findOne({ email });
            if (!user) {
                throw new GraphQLError("There is no user associated with this email");
            }
            //check password
            const checkPw = await user.isCorrectPassword(password);
            if (!checkPw) {
                throw new GraphQLError("Incorrect password");
            }
            const token = signToken(user);
            return { token, user };
        },

        addUser: async (parent, { username, email, password}) => {
            const user = await User.create({ username, email, password});
            const token = signToken(user);
            return { token, user };
        },

        saveNote: async (parent, args, context) => {
            if(!context.user) {
                throw new GraphQLError("Please login");
            }
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user_id },
                { $addToSet: { savedNotes: args.input }},
                { new: true }
            );
            return updatedUser;
        },

        removeNote: async(parent, args, context) => {
            if(!context.user) {
                throw new GraphQLError("Please login");
            }
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user_id },
                { $pull: { savedNote: {NoteId: args.noteId} }},
                { new: true }
            );
            return updatedUser;
        },
    },
};

module.exports = resolvers;