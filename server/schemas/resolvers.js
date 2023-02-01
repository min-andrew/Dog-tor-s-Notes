const { AuthenticationError } = require('apollo-server-express');
const { User, Profile, Vet } = require("../models");
const { signToken } = require("../utils/auth");
// const { GraphQLError } = require("graphql");

const resolvers = {
    Query: {
      profile: async () => {
        return await Profile.find();
      },
      vet: async (parent, { profile, petName }) => {
        const params = {};
  
        if (profile) {
          params.profile = profile;
        }
  
        if (petName) {
          params.petName = {
            $regex: petName
          };
        }
  
        return await Product.find(params).populate('profile');
      },
      vet: async (parent, { _id }) => {
        return await Product.findById(_id).populate('profile');
      },
      user: async (parent, args, context) => {
        if (context.user) {
          const user = await User.findById(context.user._id).populate({
            path: 'vet.profile',
            populate: 'profile'
          });
  
          user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
  
          return user;
        }
  
        throw new AuthenticationError('Not logged in');
      },

    },
    Mutation: {
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
  
        return { token, user };
      },
      addVet: async (parent, { vet }, context) => {
        console.log(context);
        if (context.user) {
          const vet = new Vet({ vet });
  
          await User.findByIdAndUpdate(context.user._id, { $push: { vets: vet } });
  
          return vet;
        }
  
        throw new AuthenticationError('Not logged in');
      },
      updateUser: async (parent, args, context) => {
        if (context.user) {
          return await User.findByIdAndUpdate(context.user._id, args, { new: true });
        }
  
        throw new AuthenticationError('Not logged in');
      },
    //   updateVet: async (parent, { _id, quantity }) => {
    //     const decrement = Math.abs(quantity) * -1;
  
    //     return await Vet.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    //   },
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