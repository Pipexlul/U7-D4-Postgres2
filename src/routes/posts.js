import dbManager from "../database/manager.js";
const { query } = dbManager;

const POSTS_TABLENAME = "posts";

const getPosts = async (req, res) => {
  try {
    const posts = await query(`SELECT * FROM ${POSTS_TABLENAME};`);

    res.status(200).json(posts.rows);
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

export default {
  getPosts,
  createPost,
};
