const express = require('express');
const router = express.Router();
const Listing = require('../Model/listing.js');
const User = require('../Model/user.js');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.delete('/:id',async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.send('Deleted Sucessfully');
})

module.exports=router