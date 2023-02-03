const { AuthenticationError } = require('apollo-server-express');
const { User, Profile, VetNote, Habit } = require("../models");
const { signToken } = require("../utils/auth");
// const { GraphQLError } = require("graphql");

const resolvers = {
  Query: {
    vetNote: async (parent, { profile, petName }) => {
      const params = {};

      if (profile) {
        params.profile = profile;
      }

      if (petName) {
        params.petName = {
          $regex: petName
        };
      }

      return await Profile.find(params).populate('profile');
    },
    vetNote: async (parent, { _id }) => {
      return await Product.findById(_id).populate('profile');
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
    getHabits: async () => {
      const habits = await Habit.find()
      return habits
    },
    profiles: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('profile');

        return user.profile;
      }

      throw new AuthenticationError('Not logged in');
    },
    profile: async (parent, { _id }) => {
      return await Profile.findById(_id);
    },
  },
  Mutation: {
    addHabit: async (parent, args) => {
      const newHabit = new Habit({ habitName: args.habitName, frequency: args.frequency, complete: args.complete })
      await newHabit.save()
      return newTodo
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addVetNote: async (parent, context) => {
      console.log(context);
      if (context.user) {
        const vetNote = new VetNote({ vetNote });

        await User.findByIdAndUpdate(context.user._id, { $push: { vetNotes: vetNote } });

        return vetNote;
      }

      throw new AuthenticationError('Not logged in');
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

      throw new AuthenticationError('Not logged in');
    },
    //   updateVetNote: async (parent, { _id, quantity }) => {
    //     const decrement = Math.abs(quantity) * -1;

    //     return await VetNote.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    //   },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

    }
  }
};

module.exports = resolvers;