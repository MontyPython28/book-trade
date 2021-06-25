const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  mcode: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  publisher: {
    type: String
  },
  price: {
    type: mongoose.Decimal128,
    required: true
  },
  sold: {
    type: Boolean,
    required: true
  }, // Additions for images
  avatar: {
    type: String,
    required: true
  },
  cloudinary_id: {
    type: String,
    required: true
  }, //END
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Book = mongoose.model('book', BookSchema);