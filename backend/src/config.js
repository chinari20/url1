import dotenv from "dotenv";
dotenv.config();

export const config = {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/urlShortener",
  PORT: process.env.PORT || 3000,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  JWT_SECRET: process.env.JWT_SECRET,
};
