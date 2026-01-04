const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Listing = require("./listing");

const reviewSchema = new Schema(
  {
    comment: {
      type: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

reviewSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Listing.updateMany(
      { reviews: doc._id },
      { $pull: { reviews: doc._id } }
    );
  }
});

module.exports = mongoose.model("Review", reviewSchema);
