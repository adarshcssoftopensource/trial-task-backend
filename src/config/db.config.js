const { Pool } = require('pg');

const DATABASE_CONFIG = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
};
const pool = new Pool(DATABASE_CONFIG);

pool.connect().then(() => {
    console.log('Connected to PostgreSQL database!');
}).catch((err) => {
    console.error('Error connecting to the database:', err);
});

module.exports = {
    pool
}