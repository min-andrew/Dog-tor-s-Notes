const { AuthenticationError } = require('apollo-server-express');
const { User, Profile, VetNote, Habit, Thought } = require("../models");
const { signToken } = require("../utils/auth");
// const { GraphQLError } = require("graphql");
const resolvers = {
  Query: {
    vetNotes: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('vetNote');

        return user.vetNote;
      }

      throw new AuthenticationError('Not logged in');
    },
    // Add user validation inside vetNote query.
    vetNote: async (parent, args, context) => {
      if (context.user) {
        const vetNote = await VetNote.findById(args.vetNoteId)

        return vetNote;
      }

      throw new AuthenticationError('Not logged in');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('thoughts');
    },
    profile: async (parent, args, context) => {
      if (context.user) {
        const profile = await Profile.findById(args.profileId)

        return profile;
      }

      throw new AuthenticationError('Not logged in');
    },

    profiles: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('profile');

        return user.profile;
      }

      throw new AuthenticationError('Not logged in');
    },
    environment: async () => {
      return {
        cloudinaryApiName: process.env.REACT_APP_CLOUDINARY_API_NAME
      }
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { thoughtId }) => {
      return Thought.findOne({ _id: thoughtId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    users: async () => {
      return User.find().populate('thoughts');
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    addProfile: async (parent, args, context) => {
      console.log(context);
      if (context.user) {
        const newProfile = await Profile.create(args);

        await User.findByIdAndUpdate(context.user._id, { $push: { profile: newProfile._id } });

        return newProfile;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateProfile: async (parent, args, context) => {
      if (context.user) {
        return await Profile.findByIdAndUpdate(args._id, args);
      }

      throw new AuthenticationError('Not logged in');
    },
    removeProfile: async (parent, { profileId }, context) => {
      if (context.user) {
        return await Profile.findByIdAndRemove(profileId);
      }
    },
    addVetNote: async (parent, args, context) => {
      console.log(context);
      if (context.user) {
        const newVetNote = await VetNote.create(args);
        await User.findByIdAndUpdate({ _id: context.user._id }, { $push: { vetNote: newVetNote._id } });
        return newVetNote;
      }
      throw new AuthenticationError('Not logged in');
    },
    updateVetNote: async (parent, args, context) => {
      if (context.user) {
        return await VetNote.findByIdAndUpdate(args._id, args);
      }

      throw new AuthenticationError('Not logged in');
    },
    removeVetNote: async (parent, { vetNoteId }, context) => {
      if (context.user) {
        return await VetNote.findByIdAndRemove(vetNoteId);
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addThought: async (parent, { thoughtText }, context) => {
      if (context.user) {
        const thought = await Thought.create({
          thoughtText,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { thoughts: thought._id } }
        );

        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { thoughtId, commentText }, context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeThought: async (parent, { thoughtId }, context) => {
      if (context.user) {
        const thought = await Thought.findOneAndDelete({
          _id: thoughtId,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { thoughts: thought._id } }
        );

        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { thoughtId, commentId }, context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

  }
};
module.exports = resolvers;