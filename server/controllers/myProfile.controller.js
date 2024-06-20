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

const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, phone, location, email } = req.body;

    const emailUser = await User.findOne({ email: email });
    const idUser = await User.findOne({ _id: id });

    if (emailUser._id.toString() !== idUser._id.toString())
      throw new Error("User id and email do not match");

    const imageUrl = await cloudinary.uploader.upload(image);

    await User.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          location,
          phone,
          image: imageUrl.url,
        },
      }
    );

    res.status(200).json({ message: "Your profile updated successfully" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Profile update failed" });
  }
};

export { getProfile, updateProfile };
