const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    filename: { type: String, default: "" },
    url: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4tyt2Ql2kOZgcwy1gVyExkQTR5nmBZhjCJw&s",
    },
  },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  country: { type: String, required: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Cascade delete reviews after a listing is deleted
listingSchema.post("findOneAndDelete", async function (listing) {
  if (listing) {
    try {
      // require Review model here to avoid circular dependency
      const Review = require("./review");
      await Review.deleteMany({ _id: { $in: listing.reviews } });
      console.log("Cascade delete completed for reviews");
    } catch (err) {
      console.error("Error deleting associated reviews:", err);
    }
  }
});

module.exports = mongoose.model("Listing", listingSchema);
