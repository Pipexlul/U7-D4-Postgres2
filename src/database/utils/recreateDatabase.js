import pg from "pg";
const { Pool } = pg;

import dbPoolConfig from "../../config/dbPoolConfig.js";

const recreateDb = async (pool) => {
  try {
    await pool.query(`DROP DATABASE IF EXISTS ${process.env.DB_DATABASENAME};`);

    await pool.query(`CREATE DATABASE ${process.env.DB_DATABASENAME};`);

    const dbPool = new Pool(dbPoolConfig());

    await dbPool.query(
      "CREATE TABLE posts (id SERIAL, titulo VARCHAR(25), img VARCHAR(1000), descripcion VARCHAR(255), likes INT);"
    );

    console.log("Database recreated");

    return dbPool;
  } catch (err) {
    console.error("Could not recreate database!");
    console.error(err);
  }
};

export { recreateDb };
