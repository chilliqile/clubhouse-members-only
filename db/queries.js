import pool from "./pool.js";

export async function getUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM members WHERE username=$1", [
    username,
  ]);
  return rows[0];
}

export async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM members WHERE id=$1", [id]);
  return rows[0];
}

export async function addUser(user) {
  await pool.query(
    "INSERT INTO members (username, first_name, last_name, hash) VALUES ($1, $2, $3, $4)",
    [user.username, user.first_name, user.last_name, user.hash],
  );
}

export async function getPreviewMessages() {
  const { rows } = await pool.query("SELECT id, title, body FROM messages");
  return rows;
}

export async function getFullMessages() {
  const { rows } = await pool.query(
    "SELECT messages.id, title, body, username, posted_at FROM messages JOIN members ON messages.user_id=members.id",
  );
  return rows;
}

export async function addMessage(title, body, userId) {
  await pool.query(
    "INSERT INTO messages (title, body, user_id) VALUES ($1, $2, $3)",
    [title, body, userId],
  );
}

export async function getMembership(id) {
  const { rows } = await pool.query(
    "SELECT membership_status FROM members WHERE id=$1",
    [id],
  );
  return rows[0].membership_status;
}

export async function upgradeMembership(id) {
  await pool.query(
    "UPDATE members SET membership_status = 'GOLD' WHERE id=$1",
    [id],
  );
}

export async function checkAdmin(id) {
  const { rows } = await pool.query("SELECT admin FROM members WHERE id=$1", [
    id,
  ]);
  return rows[0].admin;
}

export async function grantAdmin(id) {
  await pool.query("UPDATE members SET admin = TRUE WHERE id=$1", [id]);
}
