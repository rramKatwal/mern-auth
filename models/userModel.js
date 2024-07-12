import mongoose, { Schema, model } from "mongoose";

const userModel = model(
  "user",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phone: {
        type: String,
        required: true,
        unique: true,
      },
      address: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
      },
      profileImage: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  )
);

export default userModel;
