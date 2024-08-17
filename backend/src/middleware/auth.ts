import { NextFunction, Request, Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";
import User from "../models/user";

// Extend Express Request interface to include auth0Id and userId
declare global {
  namespace Express {
    interface Request {
      auth0Id: string;
      userId: string;
    }
  }
}

// Middleware for JWT authentication
export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

// Middleware to parse JWT and attach user info to request object
export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401); // Unauthorized if no token provided
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload; // Decode the JWT token
    const auth0Id = decoded.sub;

    const user = await User.findOne({ auth0Id }); // Find user by auth0Id

    if (!user) {
      return res.sendStatus(401); // Unauthorized if user not found
    }

    req.auth0Id = auth0Id as string; // Attach auth0Id to request
    req.userId = user._id.toString(); // Attach userId to request
    next(); // Proceed to next middleware
  } catch (error) {
    return res.sendStatus(401); // Unauthorized on error
  }
};
