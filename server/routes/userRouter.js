const express = require('express');
const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');
const userRouter = express.Router();

// set cookie -> create user -> start session -> set SSID cookie
userRouter.post('/createUser', sessionController.setCookie, userController.createUser, (req, res) => {
  console.log("Reach User Add end of middleware")
  if (res.locals.userId) {
    res.status(200).send('New User Successfully added!!!')
  }
  else res.status(200).send('Username is already taken. Please try again!')
})

// set cookie -> check if logged In -> verify user (if not loggedin) -> start session (or renew session) - set (or renew) SSID cookie
userRouter.get('/verifyUser', sessionController.setCookie, userController.verifyUser, (req, res) => {
  console.log("Reach Verify User end of middleware")
  if (res.locals.validUsername === false) {
    res.status(200).send('User does not exist!!')
  }
  else if (res.locals.validUsername && res.locals.validPassword === false) {
    res.status(200).send('Password is Incorrect!!')
  }
  else if (res.locals.validUsername && res.locals.validPassword) {
    res.status(200).send('Succesfully Logged-In!!!')
  }
})

// verify user -> update user password
// userRouter.get('/updatePassword', userController.verifyUSer, userController.updateUserPassword, (req, res) => {
  
// })

// verify user -> delete user
// userRouter.delete('/deleteUser', userController.verifyUser, userController.deleteUser, (req, res) => {
  
// })

module.exports = userRouter;