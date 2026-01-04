const Listing = require("../models/listing");
const Review = require("../models/review");
const mongoose = require("mongoose");


module.exports.createReview = async (req, res) => {

  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    req.flash("error", "Invalid Listing ID!");
    return res.redirect("/listings");
  }

  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  const reviewData = { ...req.body.review };
  reviewData.comment = reviewData.comment?.trim();
  if (!reviewData.comment) {
    req.flash("error", "Comment cannot be empty!");
    return res.redirect(`/listings/${id}`);
  }

  const newReview = new Review(reviewData);
  newReview.author = req.user._id;
  await newReview.save();

  listing.reviews.push(newReview._id);
  await listing.save();

  req.flash("success", "New Review Added!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyReview = async (req, res) => {
  const { id, reviewId } = req.params;

  const listing = await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  const review = await Review.findByIdAndDelete(reviewId);
  if (!review) {
    req.flash("error", "Review not found!");
    return res.redirect(`/listings/${id}`);
  }

  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
};