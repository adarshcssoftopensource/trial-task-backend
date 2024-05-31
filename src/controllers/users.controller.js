"use strict";
const bcrypt = require('bcryptjs');
const { sendSuccessResponse, sendErrorResponse } = require("../common/genericsFunctions");
const { INSERT_USER, GET_ALL_USERS, GET_ONE_USER, UPDATE_USER, DELETE_USER, GET_ONE_USER_WITH_EMAIL } = require("../queries/user.query");
const { pool } = require('../config/db.config');


const createUser = async (req, resp) => {
    try {
        const { email, password, name } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const values = [name, email, hashedPassword];
        const { rowCount } = await pool.query(INSERT_USER, values);
        if (rowCount) {
            return sendSuccessResponse({ response: resp, message: 'New user created', status: 201, data: 'New user created' });
        }
        return sendErrorResponse({ response: resp, status: 404, error: 'There is error while creating new user!!' });
    } catch (error) {
        return sendErrorResponse({ response: resp, status: 500, error: error });
    }
};

const getAllUsers = async (_, resp) => {
    try {
        const { rows } = await pool.query(GET_ALL_USERS);
        return sendSuccessResponse({ response: resp, status: 200, message: 'All user fetched successfully', data: rows });
    } catch (error) {
        return sendErrorResponse({ response: resp, status: 500, error: error });
    }
};

const getOneUser = async (req, resp) => {
    try {
        const { id } = req.params;
        const value = [id];
        const { rows, rowCount } = await pool.query(GET_ONE_USER, value);
        if (rowCount) {
            return sendSuccessResponse({ response: resp, status: 200, message: 'One user fetched successfully', data: rows[0] });
        };
        return sendErrorResponse({ response: resp, status: 404, error: 'User id do not exist!!' });

    } catch (error) {
        return sendErrorResponse({ response: resp, status: 500, error: error });
    }
};

const updateUser = async (req, resp) => {
    try {
        const { id, email, name } = req.body;
        const { rows, rowCount: isUserExist } = await pool.query(GET_ONE_USER, [id]);
        if (!isUserExist) {
            return sendErrorResponse({
                response: resp, status: 404, error: 'User Not found'
            });
        }
        const user = rows[0];
        if (email) {
            user.email = email;
        }
        if (name) {
            user.name = name;
        };
        const values = [user?.name, user?.email, id];
        await pool.query(UPDATE_USER, values);
        return sendSuccessResponse({
            response: resp, status: 200, data: 'User updated successfully',
            message: 'User updated successfully',
        });
    } catch (error) {
        return sendErrorResponse({
            response: resp, status: 500, error: error
        });
    };
};

const deleteUser = async (req, resp) => {
    try {
        const { id } = req.params;
        const value = [id];
        const { rowCount } = await pool.query(DELETE_USER, value);
        if (!rowCount) {
            return sendErrorResponse({
                response: resp, status: 404, error: 'User Not found'
            });
        }
        return sendSuccessResponse({
            response: resp, status: 200,
            data: 'User deleted successfully',
            message: 'User deleted successfully'
        });
    } catch (error) {
        return sendErrorResponse({
            response: resp,
            status: 500,
            error: error
        });
    };

};


module.exports = {
    getAllUsers, createUser, updateUser, deleteUser, getOneUser
}