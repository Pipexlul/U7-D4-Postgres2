import { POSTS_TABLENAME } from "../models/posts.model.js";

import dbManager from "../database/manager.js";
const { query } = dbManager;

const retrievePosts = async () => {
  try {
    const posts = await query(
      `SELECT * FROM ${POSTS_TABLENAME} ORDER BY id ASC;`
    );

    return posts.rows;
  } catch (err) {
    throw new Error(err.message || err);
  }
};

const retrievePost = async ({ id }) => {
  try {
    const post = await query(
      `SELECT * FROM ${POSTS_TABLENAME} WHERE id = $1;`,
      [id]
    );

    if (post.rows.length === 0) {
      return null;
    }

    return post.rows[0];
  } catch (err) {
    throw new Error(err.message || err);
  }
};

const insertPost = async ({ titulo, url, descripcion }) => {
  try {
    await query(
      `INSERT INTO ${POSTS_TABLENAME} (titulo, img, descripcion) VALUES ($1, $2, $3);`,
      [titulo, url, descripcion]
    );
  } catch (err) {
    throw new Error(err.message || err);
  }
};

const changePost = async ({ titulo, url, descripcion, id }) => {
  try {
    const updatedPost = await query(
      `UPDATE ${POSTS_TABLENAME} SET titulo = $1, img = $2, descripcion = $3 WHERE id = $4;`,
      [titulo, url, descripcion, id]
    );

    if (updatedPost.rowCount === 0) {
      return null;
    }
  } catch (err) {
    console.error(err);
    throw new Error(err.message || err);
  }
};

const removePost = async ({ id }) => {
  try {
    const deletedPost = await query(
      `DELETE FROM ${POSTS_TABLENAME} WHERE id = $1;`,
      [id]
    );

    if (deletedPost.rowCount === 0) {
      return null;
    }
  } catch (err) {
    console.error(err);
    throw new Error(err.message || err);
  }
};

export { retrievePosts, retrievePost, insertPost, changePost, removePost };
