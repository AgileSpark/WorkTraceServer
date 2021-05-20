const db = require ('../schemas/schemaSQL');
const bcrypt  = require ('bcrypt');
const SALT_FACTOR = 10;

const userController = {};

userController.createUser = (req, res, next) => {
  // extract the username & password from the req.body
  const { username, password } = req.body;
  // hash the user provided password with async/await
  const hashing = async () => {
    // await the bycrypted password
    return await bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          console.error(err);
          return next(err);
        }
        const newUserQuery = `
        INSERT INTO Users (username, password)
        VALUES ($1, $2)
        RETURNING *
        `
        const values = [username, hash];
      
        try {
          db.query(newUserQuery, values, (err, result) => {
            if (result) {
              const {rows} = result;
              console.log(rows)
              res.locals.userId = rows[0].user_id;
              console.log(res.locals.userId);
              return next();
            }
            else return next();
          });
        } catch (err) {next(err);}
      })
    })
  }
  hashing()
};

userController.verifyUser = (req, res, next) => {
  // extract the username & password from the req.body
  const { username, password } = req.body;
  const verifyUserQuery = `
  SELECT *
  FROM Users
  WHERE username='${username}'
  `
  try {
    db.query(verifyUserQuery, (err, result) => {
      if (result.rows.length > 0) {
        res.locals.validUsername = true;
        const {rows} = result;
        bcrypt.compare(password, rows[0].password, (err, result) => {
          if (err) return next(err);
          req.session.auth = { username: rows[0].username, user_id: rows[0].user_id };
          res.locals.validPassword = result;
          if (result) res.locals.userId = rows[0].user_id
          return next();
        })
      }
      else {
        res.locals.validUsername = false;
        res.locals.validPassword = false;
        return next();
      }
    });
  } catch (err) {next(err);}
};

userController.deleteUser = (req, res, next) => {
  const userQuery = 
    `SELECT ***
    FROM ****
    `;
  try {
    db.query(userQuery, (err, result) => {
      const {rows} = result;
      res.locals.verifyUser = rows;
      return next();
    });
  } catch (err) {next(err);}
};

userController.updateUserPassword = (req, res, next) => {
  const userQuery = 
    `SELECT ***
    FROM ****
    `;
  try {
    db.query(userQuery, (err, result) => {
      const {rows} = result;
      res.locals.verifyUser = rows;
      return next();
    });
  } catch (err) {next(err);}
};

userController.logout = (req, res, next) => {
	req.session.destroy(function (err) {
		if (err) {
			res.locals =
				'There was a problem with logging out. Please check that you are logged in.';
			return next();
		}
		return next();
	});
};

module.exports  = userController;