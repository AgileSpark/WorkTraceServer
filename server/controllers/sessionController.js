const db = require ('../schemas/schemaSQL');

const sessionController = {};
// This is a database solution for managing sessions, temporarily refactored to using browser
// sessionController.setCookie = (req, res, next) => {
//   try {
//     res.cookie('WorkTrace', Math.floor(Math.random() * 99).toString(), {
//       httpOnly: true,
//       secure: true,
//       maxAge: 360000
//     });
//     return next();
//   } catch (err) {next(err);}
// };

// sessionController.setSSIDCookie = (req, res, next) => {
//   try {
//     res.cookie('SSID', Math.floor(Math.random() * 99).toString(), {
//       httpOnly: true,
//       secure: true,
//       maxAge: 360000
//     });
//     return next();
//   } catch (err) {next(err);}
// };

// sessionController.loggedIn = (req, res, next) => {
//   const sessionQuery = 
//   `SELECT ***
//   FROM ****
//   `;
//   try {
//   db.query(sessionQuery, (err, result) => {
//     const {rows} = result;
//     res.locals.sessionStatus = rows;
//     return next();
//   });
//   } catch (err) {next(err);}
// };

// sessionController.startSession = (req, res, next) => {
//   const sessionQuery = 
//   `SELECT ***
//   FROM ****
//   `;
//   try {
//   db.query(sessionQuery, (err, result) => {
//     const {rows} = result;
//     res.locals.sessionStatus = rows;
//     return next();
//   });
//   } catch (err) {next(err);}
// }

module.exports  = sessionController;