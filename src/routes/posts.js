import dbManager from "../database/manager.js";
const { query } = dbManager;

const POSTS_TABLENAME = "posts";

const getPosts = async (req, res) => {
  try {
    const posts = await query(
      `SELECT * FROM ${POSTS_TABLENAME} ORDER BY id ASC;`
    );

    res.status(200).json(posts.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await query(
      `SELECT * FROM ${POSTS_TABLENAME} WHERE id = $1;`,
      [id]
    );

    if (post.rows.length === 0) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    return res.status(200).json(post.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body;

    await query(
      `INSERT INTO ${POSTS_TABLENAME} (titulo, img, descripcion) VALUES ($1, $2, $3);`,
      [titulo, url, descripcion]
    );

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

    const updatedPost = await query(
      `UPDATE ${POSTS_TABLENAME} SET titulo = $1, img = $2, descripcion = $3 WHERE id = $4;`,
      [titulo, url, descripcion, id]
    );

    if (updatedPost.rowCount === 0) {
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

    const deletedPost = await query(
      `DELETE FROM ${POSTS_TABLENAME} WHERE id = $1;`,
      [id]
    );

    if (deletedPost.rowCount === 0) {
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
  getPosts,
  getPost,
  createPost,
  modifyPost,
  deletePost,
};
