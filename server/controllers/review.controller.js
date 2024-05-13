import Review from "../mongodb/models/review.js";
import User from "../mongodb/models/user.js";
import Property from "../mongodb/models/property.js";

import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const getAllReviews = async (req, res) => {};

const getReviewById = async (req, res) => {};

const createReview = async (req, res) => {
  try {
    const { description, rating, userId, propertyId } = req.body;

    //start new session
    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ _id: userId }).session(session);
    const property = await Property.findOne({ _id: propertyId }).session(session);
    if (!user) throw new Error("User not found");
    if(!property) throw new Error("Property not found");

    const newReview = await Review.create({
        creator: user._id,
        property: property._id,
        description, 
        rating,
    });

    user.allReviews.push(newReview._id);
    await user.save({ session });

    property.allReviews.push(newReview._id);
    property.reviewedByUsers.push(newReview.creator);
    await property.save({ session });

    await session.commitTransaction();

    res.status(200).json({ message: "Review created successfully!" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Failed creating review" });
  }
};

const updateReview = async (req, res) => {};

const deleteReview = async (req, res) => {};

export {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
