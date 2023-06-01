import {
  retrievePosts,
  retrievePost,
  insertPost,
  changePost,
  removePost,
} from "../controllers/posts.controller.js";

import asyncLoader from "../middleware/asyncMiddleware.js";

const POSTS_TABLENAME = "posts";

const getPosts = async (req, res) => {
  try {
    const posts = await retrievePosts();

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await retrievePost({ id });

    if (post === null) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body;

    await insertPost({ titulo, url, descripcion });

    res.status(201).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const modifyPost = async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body;
    const { id } = req.params;

    const updatedPost = await changePost({ titulo, url, descripcion, id });

    if (updatedPost === null) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPost = await removePost({ id });

    if (deletedPost === null) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export default {
  getPosts: asyncLoader(getPosts),
  getPost: asyncLoader(getPost),
  createPost: asyncLoader(createPost),
  modifyPost: asyncLoader(modifyPost),
  deletePost: asyncLoader(deletePost),
};
