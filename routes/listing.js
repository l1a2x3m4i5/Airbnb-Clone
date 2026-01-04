const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js"); 
const { listingSchema } = require("../schema.js"); 
const { reviewSchema } = require("../reviewSchema.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

// Validation middleware
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body, { allowUnknown: true });
  if (error) {
    const errMsg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// New Route -> GET /listings/new
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Index Create 
router.route("/").get(wrapAsync(listingController.index))
// .post(isLoggedIn, validateListing, wrapAsync(listingController.createListing));
.post(upload.single("image"),(req, res) => {
  res.send(req.file);
})

// Show Update Delete 
router.route("/:id").get(wrapAsync(listingController.showListing)).
put(isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing)).
delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// Edit Route -> GET /listings/:id/edit
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));

module.exports = router;
