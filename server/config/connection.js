const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_UR || 'mongodb://127.0.0.1:27017/dog-tors',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;