const { pool } = require("../config/db.config");


pool.query('CREATE TABLE IF NOT EXISTS Users (' +
    'id SERIAL PRIMARY KEY, ' +
    'name VARCHAR(50) NOT NULL, ' +
    'email VARCHAR(50) NOT NULL, ' +
    'password VARCHAR(255) NOT NULL)', (err) => {
        if (err) {
            console.log("Error while creating Users table: " + err.message);
        }
        else {
            console.log("Users table successfully created!");
        }
    }
);