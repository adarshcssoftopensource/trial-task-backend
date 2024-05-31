
const INSERT_USER = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`;
const GET_ALL_USERS = 'SELECT * FROM users ORDER BY id DESC';
const GET_ONE_USER = `SELECT * FROM users WHERE id=$1`;
const UPDATE_USER = `UPDATE users SET name=$1, email=$2 WHERE id=$3`;
const DELETE_USER = `DELETE FROM users where id=$1`;

// other queries
const GET_ONE_USER_WITH_EMAIL = `SELECT * FROM users WHERE email=$1`

module.exports = {
    INSERT_USER, GET_ALL_USERS, GET_ONE_USER, UPDATE_USER, DELETE_USER, GET_ONE_USER_WITH_EMAIL
}