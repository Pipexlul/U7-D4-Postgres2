import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import getPostValidator from "./middleware/getPostValidator.js";
import createPostValidator from "./middleware/createPostValidator.js";
import modifyPostValidator from "./middleware/modifyPostValidator.js";
import deletePostValidator from "./middleware/deletePostValidator.js";

import postsRoutes from "./routes/posts.js";

const main = async () => {
  const portNum = parseInt(process.env.TEST_PORT);
  const DEFAULT_PORT = portNum || 3000;

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/posts", postsRoutes.getPosts);
  app.get("/posts/:id", getPostValidator, postsRoutes.getPost);
  app.post("/posts", createPostValidator, postsRoutes.createPost);
  app.put("/posts/:id", modifyPostValidator, postsRoutes.modifyPost);
  app.delete("/posts/:id", deletePostValidator, postsRoutes.deletePost);

  app.listen(DEFAULT_PORT, () => {
    console.log(`Server running on port ${DEFAULT_PORT}`);
  });
};

main();
