import mongoose from "mongoose";

const Database = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
  } catch (error) {
    throw error;
  }
};

export default Database;
