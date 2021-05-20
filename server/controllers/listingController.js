const db = require ('../schemas/schemaSQL');

const listingController = {};

listingController.getListings = (req, res, next) => {
  const {user_id} = req.body
  
  const getListingsQuery = `
  SELECT *
  FROM Listings
  WHERE user_id='${user_id}'
  `
  try {
    db.query(getListingsQuery, (err, result) => {
      if (result) {
        const {rows} = result;
        res.locals.userListings = rows;
        return next();
      }
      else return next();
    });
  } catch (err) {next(err);}
};

listingController.addListing = (req, res, next) => {
  const {user_id, company, source, location, url} = req.body
  console.log('Inputs', user_id, company, source, location, url)
  const newListingQuery = `
  INSERT INTO Listings (user_id, company, source, location, url)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *
  `
  const values = [user_id, company, source, location, url];
  try {
    db.query(newListingQuery, values, (err, result) => {
      if (result) {
        const {rows} = result;
        console.log('Row data', rows[0])
        res.locals.addedListing = rows[0];
        return next();
      }
      else return next();
    });
  } catch (err) {next(err);}
};

listingController.removeListing = (req, res, next) => {
  const listingQuery = 
    `SELECT ***
    FROM ****
    `;
  try {
    db.query(listingQuery, (err, result) => {
      const {rows} = result;
      res.locals.userListings = rows;
      return next();
    });
  } catch (err) {next(err);}
};

module.exports  = listingController;