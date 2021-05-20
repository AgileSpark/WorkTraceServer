const express = require('express');
const listingController = require('../controllers/listingController');
const sessionController = require('../controllers/sessionController');
const listingRouter = express.Router();

// set cookie -> create user -> start session -> set SSID cookie
listingRouter.post('/addListing', listingController.addListing, (req, res) => {
  console.log('Made it to the end of add/listing')
  if (res.locals.addedListing) {
    res.status(200).json({addedJob: res.locals.addedListing})
  } else {
    res.status(200).json({jobNotAdded: true})
  }
})

// set cookie -> check if logged In -> verify user (if not loggedin) -> start session (or renew session) - set (or renew) SSID cookie
listingRouter.get('/getListings', listingController.getListings, (req, res) => {
  console.log('Made it to the get listing route')
  if (res.locals.userListings) {
    res.status(200).json({userListings: res.locals.userListings})
  } else {
    res.status(200).json({jobsNotFound: true})
  }

})

module.exports = listingRouter;