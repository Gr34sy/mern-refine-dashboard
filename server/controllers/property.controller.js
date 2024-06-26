import Property from "../mongodb/models/property.js";
import User from "../mongodb/models/user.js";

import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllProperties = async (req, res) => {
  const {
    _end,
    _order,
    _start,
    _sort,
    title_like = "",
    propertyType = "",
  } = req.query;

  const query = {};

  if (propertyType !== "") {
    query.propertyType = propertyType;
  }
  if (title_like) {
    query.title = { $regex: title_like, $options: "i" };
  }

  if(_sort && _order){
    try {
      const count = await Property.countDocuments({ query });
      const properties = await Property.find(query)
        .limit(_end)
        .skip(_start)
        .sort({ [_sort]: _order });
      res.header("x-total-count", count);
      res.header("Access-Control-Expose-Headers", "x-total-count");
  
      res.status(200).json(properties);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "API Error" });
    }

  }else{

    try {
      const properties = await Property.find(query).sort({$natural:-1}).limit(_end);
  
      res.status(200).json(properties);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "API Error" });
    }
  }
};

const getPropertyDetail = async (req, res) => {
  const { id } = req.params;
  const propertyExists = await Property.findOne({ _id: id }).populate(
    "creator"
  ).populate({path: "allReviews", populate: {path: 'creator'}});

  if (propertyExists) {
    res.status(200).json(propertyExists);
  } else {
    res.status(404).json({ message: "Property not found" });
  }
};

const createProperty = async (req, res) => {
  try {
    const { title, description, propertyType, location, price, photo, email } = req.body;

    //start new session
    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email }).session(session);

    if (!user) throw new Error("User not found");

    const photoUrl = await cloudinary.uploader.upload(photo);

    const newProperty = await Property.create({
      title,
      description,
      propertyType,
      location,
      price,
      photo: photoUrl.url,
      creator: user._id,
    });

    user.allProperties.push(newProperty._id);
    await user.save({ session });

    await session.commitTransaction();

    res.status(200).json({ message: "Property created successfully!" });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Failed creating property" });
  }
};

const updateProperty = async (req, res) => {
  try {
    const {id} = req.params;
    const {title, description, propertyType, location, price, photo} = req.body;

    const photoUrl = await cloudinary.uploader.upload(photo);

    await Property.findByIdAndUpdate({_id: id}, {
      title,
      description,
      propertyType,
      location,
      price,
      photo: photoUrl.url,
    })

    res.status(200).json({message: 'Property updated successfully'})

  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Property update failed" });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const propertyToDelete = await Property.findById({ _id: id }).populate(
        "creator",
    );

    if (!propertyToDelete) throw new Error("Property not found");

    const session = await mongoose.startSession();
    session.startTransaction();

    await propertyToDelete.deleteOne({ session });
    propertyToDelete.creator.allProperties.pull(propertyToDelete);

    await propertyToDelete.creator.save({ session });
    await session.commitTransaction();

    res.status(200).json({ message: "Property deleted successfully" });
} catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed deleting the property" });
}
};

export {
  getAllProperties,
  getPropertyDetail,
  createProperty,
  updateProperty,
  deleteProperty,
};
