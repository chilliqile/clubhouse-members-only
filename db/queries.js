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

export async function addUser(user) {
  await pool.query(
    "INSERT INTO members (username, first_name, last_name, hash) VALUES ($1, $2, $3, $4)",
    [user.username, user.first_name, user.last_name, user.hash],
  );
}
