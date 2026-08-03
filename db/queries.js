import pool from "./pool.js";

export async function getUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM members WHERE username=$1", [
    username,
  ]);
  return rows[0];
}

export async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id=$1", [
    username,
  ]);
  return rows[0];
}
