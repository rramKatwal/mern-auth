import bcrypt from "bcrypt";

export const hashedPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashpassword = await bcrypt.hash(password, saltRounds);
    return hashpassword;
  } catch (error) {
    throw error;
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw error;
  }
};
