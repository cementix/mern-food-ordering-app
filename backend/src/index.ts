import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import myUserRoute from "./routes/MyUserRoute";
import orderRoute from "./routes/OrderRoute";
import restaurantRoute from "./routes/RestaurantRoute";

// Define port constant to start the server
const PORT = 7000;

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database"))
  .catch(() => console.log("Error connecting to database"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// App init
const app = express();

// Middlewares
app.use(cors());
app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));
app.use(express.json());

// Health check route
app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/order", orderRoute);

// Routes
app.get("/test", async (req: Request, res: Response) => {
  res.json({ message: "Hello" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on localhost:${PORT}`);
});
