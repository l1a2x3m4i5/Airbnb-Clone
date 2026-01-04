const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review.js");
const mongoose = require("mongoose");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isReviewAuthor } = require("../middleware.js");
const { reviewSchema } = require("../reviewSchema.js");
const reviewController = require("../controllers/reviews.js");
 
// Review validation middleware
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body, { allowUnknown: true });
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  }
  next();
};

// POST: Add review
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// DELETE: Delete review
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;
