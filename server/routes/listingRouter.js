const express = require('express');
const listingController = require('../controllers/listingController');
const sessionController = require('../controllers/sessionController');
const listingRouter = express.Router();

// set cookie -> create user -> start session -> set SSID cookie
// listingRouter.post('/addListing', sessionController.loggedIn, listingController.addListing, (req, res) => {

// })

// set cookie -> check if logged In -> verify user (if not loggedin) -> start session (or renew session) - set (or renew) SSID cookie
// listingRouter.get('/getListings', sessionController.loggedIn, listingController.getListings, (req, res) => {
  
// })

module.exports = listingRouter;