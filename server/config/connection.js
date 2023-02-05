const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://blu:blupassword@atlascluster.jod4lzg.mongodb.net/dogtors?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;