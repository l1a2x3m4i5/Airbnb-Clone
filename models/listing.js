const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

    image: {
        filename: {
            type: String,
            default: "",
        },
        url: {
            type: String,
            default:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4tyt2Ql2kOZgcwy1gVyExkQTR5nmBZhjCJw&s",
        },
    },
    price: {
        type: Number,
        required: true,
    },

    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;