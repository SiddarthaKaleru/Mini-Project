const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name:"dqfp8y7a2",
  api_key:"149622355593815",
  api_secret:"tJnvG9EV4Q2hMHBj8rTxURZBQ8o"
});
// console.log(cloudinary.config());
module.exports = cloudinary;


