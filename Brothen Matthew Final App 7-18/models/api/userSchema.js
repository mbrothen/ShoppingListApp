const Joi = require('joi');

const createUserSchema = Joi.object().keys({
    username: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const getUserListQuerySchema = Joi.object().keys({
    skip: Joi.string().optional(),
    limit: Joi.string().optional()
}).and('skip', 'limit');

const getUserDetailPathParamSchema = Joi.object().keys({
    userId: Joi.string().required()
});

const updateUserPathParamSchema = Joi.object().keys({
    userId: Joi.string().required()
});

const updateUserSchema = Joi.object().keys({
    username: Joi.string().optional(),
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    password: Joi.string().optional()
});

const deleteUserPathParamSchema = Joi.object().keys({
    userId: Joi.string().required()
});

const authenticateUserSchema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
});

module.exports = {
    'createUserSchema': createUserSchema,
    'getUserListQuerySchema': getUserListQuerySchema,
    'getUserDetailPathParamSchema': getUserDetailPathParamSchema,
    'updateUserPathParamSchema': updateUserPathParamSchema,
    'updateUserSchema': updateUserSchema,
    'deleteUserPathParamSchema': deleteUserPathParamSchema,
    'authenticateUserSchema': authenticateUserSchema
};