const { Pool } = require("pg");
const { body, param } = require("express-validator");
const { GET_ONE_USER_WITH_EMAIL } = require("../queries/user.query");
const { pool } = require("../config/db.config");
const CREATE_USER_VALIDATION = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .trim()
        .isEmail().withMessage('Please enter a valid email')
        .custom(async (email) => {
            try {
                const user = await getUserByEmail(email);
                if (user) {
                    return Promise.reject('Email is already in use');
                }
                return true;
            } catch (error) {
                return Promise.reject('Database error');
            }
        }),
    body('name').notEmpty().withMessage('Name is required'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 5, max: 10 }).withMessage('Password must be between 5 and 10 characters'),
];

const getUserByEmail = async (email) => {
    try {
        const { rowCount } = await pool.query(GET_ONE_USER_WITH_EMAIL, [email]);
        return rowCount > 0;
    } catch (error) {
        throw new Error('Database error');
    }
};

const GET_ONE_AND_DELETE_USER_VALIDATION = [
    param('id').notEmpty().withMessage('id is required'),
];

const UPDATE_USER_VALIDATIONS = [
    body('id').notEmpty().withMessage('Id is required')
]


module.exports = { CREATE_USER_VALIDATION, GET_ONE_AND_DELETE_USER_VALIDATION ,UPDATE_USER_VALIDATIONS};