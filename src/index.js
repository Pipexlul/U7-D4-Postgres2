import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import asyncLoader from "./middleware/asyncMiddleware.js";
import createPostValidator from "./middleware/createPostValidator.js";
import postsRoutes from "./routes/posts.js";

const main = async () => {
  const portNum = parseInt(process.env.TEST_PORT);
  const DEFAULT_PORT = portNum || 3000;

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/posts", asyncLoader(postsRoutes.getPosts));
  app.post("/posts", createPostValidator, asyncLoader(postsRoutes.createPost));

  app.listen(DEFAULT_PORT, () => {
    console.log(`Server running on port ${DEFAULT_PORT}`);
  });
};

main();
