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
  const status = 0;
  console.log('Inputs', user_id, company, source, location, url)
  const newListingQuery = `
  INSERT INTO Listings (user_id, company, source, location, url, status)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *
  `
  const values = [user_id, company, source, location, url, status];
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

listingController.updateStatus = (req, res, next) => {
  const {listing_id, status} = req.body
  console.log('Inputs', listing_id, status)
  const updateStatusQuery = `
  UPDATE Listings
  SET status=${status}
  WHERE listing_id=${listing_id}
  `
  try {
    db.query(updateStatusQuery, (err, result) => {
      if (result) {
        const {rows} = result;
        console.log('Row data', rows[0])
        res.locals.updatedListing = rows[0];
        return next();
      }
      else return next();
    });
  } catch (err) {next(err);}
};

listingController.removeListing = (req, res, next) => {
  const {listing_id} = req.body
  console.log('Inputs', listing_id)
  const removeListingQuery = `
  DELETE FROM Listings
  WHERE listing_id=${listing_id}
  `
  try {
    db.query(removeListingQuery, (err, result) => {
      if (result) {
        const {rows} = result;
        console.log('Row data', rows[0])
        res.locals.removedListing = rows[0];
        return next();
      }
      else return next();
    });
  } catch (err) {next(err);}
};

module.exports  = listingController;