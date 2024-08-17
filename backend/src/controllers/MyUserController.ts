import { Request, Response } from "express";
import User from "../models/user";

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

    // 3. Return the user object to the calling client
    res.status(201).json(newUser.toObject()); // User created, return 201 Created with user data
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" }); // Handle errors
  }
};

export default {
  createCurrentUser,
};
