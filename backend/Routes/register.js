const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../cloudConfig.js');
const Listing = require('../Model/listing.js');
const User = require('../Model/user.js');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'mini_DEV', 
    allowedFormats: ['png', 'jpeg', 'jpg'],
  },
});

const upload = multer({ storage });

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/',upload.single('image'), async (req, res) => {
 
  try {
    const { id } = req.body; 
    const imageUrl = req.file ? req.file.path : null;
    const newListing = new Listing({
        fullName: req.body.fullName,
        rollNumber: req.body.rollNumber,
        batchYear: req.body.batchYear,
        program: req.body.program,
        department: req.body.department,
        email: req.body.email,
        phone: req.body.phone,
        gpa: req.body.gpa,
        graduationYear: req.body.graduationYear,
        projectTitle: req.body.projectTitle,
        internships: req.body.internships,
        dateOfBirth: req.body.dateOfBirth,
        address: req.body.address,
        hobbies: req.body.hobbies,
        linkedIn: req.body.linkedIn,
        clubs: req.body.clubs,
        achievements: req.body.achievements,
        sports: req.body.sports,
        personalStatement: req.body.personalStatement,
        favoriteMemory: req.body.favoriteMemory,
        futurePlans: req.body.futurePlans,
        image: imageUrl, 
    });

    const currUser = await User.findById(id);
    if (currUser) {
        newListing.user=id;
        await newListing.save();
        return res.status(201).json({ message: 'User details have been added successfully!' });
    } else {
        return res.status(401).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error saving listing or uploading image:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});


router.patch('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;

    // Prepare the updated fields object
    const updatedFields = {};

    // Loop through request body and add non-null fields to updatedFields
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined && req.body[key] !== '') {
        updatedFields[key] = req.body[key];
      }
    });

    // If a file is uploaded, add the file path to the updatedFields
    if (req.file) {
      updatedFields.image = req.file.path; // Assuming you're saving the file path
    }

    // Use findByIdAndUpdate to update the listing
    const updatedListing = await Listing.findByIdAndUpdate(id, updatedFields, {
      new: true, // Return the updated document
      runValidators: true, // Validate before updating
    });

    if (!updatedListing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    return res.status(200).json({
      message: 'Listing updated successfully!',
      data: updatedListing,
    });
  } catch (error) {
    console.error('Error updating listing:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});



router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find(); 
    res.status(200).json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id',async(req,res)=>{
  try{
    const {id}=req.params;
    const listing=await Listing.findById(id);
    res.status(200).json(listing);
  }catch(error){
    console.log("Error While Fetching listing",error);
    res.status(500).json({ message: 'Server error' });
  }
})

module.exports = router;
