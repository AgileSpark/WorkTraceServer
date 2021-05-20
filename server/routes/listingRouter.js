const express = require('express');
const listingController = require('../controllers/listingController');
const sessionController = require('../controllers/sessionController');
const listingRouter = express.Router();

listingRouter.post('/addListing', listingController.addListing, (req, res) => {
  console.log('Made it to the end of add/listing')
  if (res.locals.addedListing) {
    res.status(200).json({addedJob: res.locals.addedListing})
  } else {
    res.status(200).json({jobNotAdded: true})
  }
})

listingRouter.post('/getListings', listingController.getListings, (req, res) => {
  console.log('Made it to the get listing route')
  if (res.locals.userListings) {
    res.status(200).json({userListings: res.locals.userListings})
  } else {
    res.status(200).json({jobsNotFound: true})
  }
})

listingRouter.post('/updateStatus', listingController.updateStatus, (req, res) => {
  console.log('Made it to the updateListing route!!')
  if (res.locals.updatedListing) {
    res.status(200).json({userListings: res.locals.updatedListing})
  } else {
    res.status(200).json({jobsNotFound: true})
  }
})

listingRouter.post('/removeListing', listingController.removeListing, (req, res) => {
  console.log('Made it to the updateListing route!!')
  if (res.locals.removedListing) {
    res.status(200).json({userListings: res.locals.removedListing})
  } else {
    res.status(200).json({jobsNotFound: true})
  }
})

module.exports = listingRouter;