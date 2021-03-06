const express = require('express');
const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');
const userRouter = express.Router();

// set cookie -> create user -> start session -> set SSID cookie
userRouter.post('/createUser', userController.createUser, (req, res) => {
  console.log("Reach User Add end of middleware")
  if (res.locals.userId) {
    res.status(200).json({userCreated: true})
  }
  else res.status(200).json({userCreated: false})
})

// set cookie -> check if logged In -> verify user (if not loggedin) -> start session (or renew session) - set (or renew) SSID cookie
userRouter.post('/verifyUser', userController.verifyUser, (req, res) => {
  console.log("Reach Verify User end of middleware")
  console.log('statements', res.locals.validUsername, res.locals.validPassword);
  if (res.locals.validUsername === false) {
    res.status(200).json({usernameVerified: res.locals.validUsername, passwordVerified: res.locals.validPassword, user_id: res.locals.userId});
  }
  else if (res.locals.validUsername && res.locals.validPassword === false) {
    res.status(200).json({usernameVerified: res.locals.validUsername, passwordVerified: res.locals.validPassword, user_id: res.locals.userId});
  }
  else if (res.locals.validUsername && res.locals.validPassword) {
    res.status(200).json({usernameVerified: res.locals.validUsername, passwordVerified: res.locals.validPassword, user_id: res.locals.userId});
  }
})

userRouter.get('/checkSession', (req, res) => {
	res.status(200).json(req.session.auth);
});

userRouter.get('/logout', userController.logout, (req, res) => {
  res.status(200).json({userLoginStatus: false});
});



// verify user -> update user password
// userRouter.get('/updatePassword', userController.verifyUSer, userController.updateUserPassword, (req, res) => {
  
// })

// verify user -> delete user
// userRouter.delete('/deleteUser', userController.verifyUser, userController.deleteUser, (req, res) => {
  
// })

module.exports = userRouter;