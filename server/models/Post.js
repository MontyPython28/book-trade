const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  mcode: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  likes: {
    type: Number,
    required: true
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostSchema);