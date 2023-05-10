import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import asyncLoader from "./middleware/asyncMiddleware.js";
import getPostValidator from "./middleware/getPostValidator.js";
import createPostValidator from "./middleware/createPostValidator.js";
import modifyPostValidator from "./middleware/modifyPostValidator.js";

import postsRoutes from "./routes/posts.js";

const main = async () => {
  const portNum = parseInt(process.env.TEST_PORT);
  const DEFAULT_PORT = portNum || 3000;

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/posts", asyncLoader(postsRoutes.getPosts));
  app.get("/posts/:id", getPostValidator, asyncLoader(postsRoutes.getPost));
  app.post("/posts", createPostValidator, asyncLoader(postsRoutes.createPost));
  app.put(
    "/posts/:id",
    modifyPostValidator,
    asyncLoader(postsRoutes.modifyPost)
  );

  app.listen(DEFAULT_PORT, () => {
    console.log(`Server running on port ${DEFAULT_PORT}`);
  });
};

main();
