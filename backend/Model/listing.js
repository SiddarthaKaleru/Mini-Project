const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  // Basic Information
  fullName: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
  },
  batchYear: {
    type: String,
    required: true,
  },
  // collegeName:{
  //   type:String,
  //   required:true
  // },
  program: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },

  // Academic Information
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gpa: {
    type: String,
  },
  graduationYear: {
    type: String,
  },
  projectTitle: {
    type: String,
  },
  internships: {
    type: String,
  },

  // Personal Information
  dateOfBirth: {
    type: Date,
  },
  address: {
    type: String,
  },
  hobbies: {
    type: String,
  },
  linkedIn: {
    type: String,
  },

  // Extracurricular Information
  clubs: {
    type: String,
  },
  achievements: {
    type: String,
  },
  sports: {
    type: String,
  },

  // Additional Information
  personalStatement: {
    type: String,
  },
  favoriteMemory: {
    type: String,
  },
  futurePlans: {
    type: String,
  },
  image: {
    type: String, 
  },
  user:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user',
    required: false,
  }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
