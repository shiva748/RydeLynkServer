const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    UserId: {
      type: String,
      required: true,
    },
    Name: {
      type: String,
      required: true,
    },
    DriverId: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const RatingSchema = new Schema(
  {
    UserId: {
      type: String,
      required: true,
    },
    Reviews: [reviewSchema],
    OverallRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

const Rating = mongoose.model("Rating", RatingSchema);
module.exports = Rating;
