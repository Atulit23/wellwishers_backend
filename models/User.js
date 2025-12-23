const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const treeDecoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  ornament: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  treeId: {
    type: String,
    unique: true,
    default: () => uuidv4()
  },
  treeName: {
    type: String,
    required: false,
    trim: false,
    default: ''
  },
  treeDecos: [treeDecoSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);

