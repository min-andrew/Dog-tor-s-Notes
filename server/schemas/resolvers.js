const { AuthenticationError } = require('apollo-server-express');
const { User, Profile, VetNote, Habit } = require("../models");
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
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'vetNote.profile',
          populate: 'profile'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
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
    }
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
    }

  }
};
module.exports = resolvers;