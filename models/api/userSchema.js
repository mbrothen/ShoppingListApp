const Joi = require('joi');

const createUserSchema = Joi.object().keys({
    name: Joi.string().required(),
    phone: Joi.number().required(),
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
    name: Joi.string().optional(),
    phone: Joi.number().optional(),
    password: Joi.string().optional()
});

const deleteUserPathParamSchema = Joi.object().keys({
    userId: Joi.string().required()
});

const authenticateUserSchema = Joi.object().keys({
    name: Joi.string().required(),
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