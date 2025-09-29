import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Helper to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// Format response (to avoid repeating code)
const formatUserResponse = (user) => ({
  _id: user._id,
  username: user.username,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  phoneNumber: user.phoneNumber,
  address: user.address,
  gender: user.gender,
  dob: user.dob,
  token: generateToken(user),
});

// @desc Register new user
// @route POST /api/users/register
export const registerUser = async (req, res) => {
  try {
    const { username, firstName, lastName, email, password, dob, phoneNumber, address, gender } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dob,
      phoneNumber,
      address,
      gender,
    });

    return res.status(201).json(formatUserResponse(user));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Login user
// @route POST /api/users/login
// @desc Login user
// @route POST /api/users/login
export const loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Find by username OR email
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json(formatUserResponse(user));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// @desc Update user profile
// @route PUT /api/users/:id
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Only the owner can update their profile
    if (req.user.id !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updates = req.body;
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json(formatUserResponse(updatedUser));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Delete user profile
// @route DELETE /api/users/:id
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (req.user.id !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await User.findByIdAndDelete(userId);

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
