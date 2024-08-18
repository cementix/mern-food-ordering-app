import { Request, Response } from "express";
import User from "../models/user";

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });
    if (!currentUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(currentUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting user" }); // Handle errors
  }
};

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    // 1. Check if the user already exists
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      return res.status(200).send(); // User exists, return 200 OK
    }

    // 2. Create the user if it doesn't exist
    const newUser = new User(req.body);
    await newUser.save();

    // 3. Return the created user object
    res.status(201).json(newUser.toObject()); // User created, return 201 Created
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" }); // Handle errors
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId); // Find user by ID
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // User not found
    }

    // Update user details
    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save(); // Save updated user
    res.status(200).json(user.toObject()); // Return updated user data
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" }); // Handle errors
  }
};

export default {
  createCurrentUser,
  updateCurrentUser,
  getCurrentUser,
};
