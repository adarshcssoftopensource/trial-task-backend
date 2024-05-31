const express = require('express');
const { getAllUsers, createUser, updateUser, getOneUser, deleteUser } = require('../controllers/users.controller');
const { CREATE_USER_VALIDATION, GET_ONE_AND_DELETE_USER_VALIDATION, UPDATE_USER_VALIDATIONS } = require('../validations/user.validations');
const checkValidations = require('../middleware/validation.middleware');
const userRoutes = new express.Router();

userRoutes.post('/user', CREATE_USER_VALIDATION, checkValidations, createUser);
userRoutes.get('/user', getAllUsers);
userRoutes.get('/user/:id', GET_ONE_AND_DELETE_USER_VALIDATION, checkValidations, getOneUser);
userRoutes.put('/user', UPDATE_USER_VALIDATIONS, checkValidations, updateUser);
userRoutes.delete('/user/:id', GET_ONE_AND_DELETE_USER_VALIDATION, checkValidations, deleteUser);

module.exports = userRoutes;
