const Joi = require('joi');

const createItemSchema = Joi.object().keys({
    itemName: Joi.string().required(),
    itemDescription: Joi.string().optional(),
    itemCategory: Joi.string().optional(),
    purchaseDates: Joi.alternatives().try(Joi.array().items(Joi.date()), Joi.string()).optional(),
    usedDates: Joi.alternatives().try(Joi.array().items(Joi.date()), Joi.string()).optional(),
    shopplingListQty: Joi.number().optional(),
    pantryListQty: Joi.number().optional()
});

/*const getShoppingListQuerySchema = Joi.object().keys({
    skip: Joi.string().optional(),
    limit: Joi.string().optional()
}).and('skip', 'limit');*/

const getItemDetailPathParamSchema = Joi.object().keys({
    itemId: Joi.string().required()
});

const updateItemPathParamSchema = Joi.object().keys({
    userId: Joi.string().required()
});

const updateItemrSchema = Joi.object().keys({
    itemName: Joi.string().optional(),
    itemDescription: Joi.string().optional(),
    itemCategory: Joi.string().optional(),
    purchaseDates: Joi.alternatives().try(Joi.array().items(Joi.date()), Joi.string()).optional(),
    usedDates: Joi.alternatives().try(Joi.array().items(Joi.date()), Joi.string()).optional(),
    shopplingListQty: Joi.number().optional(),
    pantryListQty: Joi.number().optional()
});




module.exports = {
    'createItemSchema': createItemSchema,
    'getUserListQuerySchema': getUserListQuerySchema,
    'getUserDetailPathParamSchema': getUserDetailPathParamSchema,
    'updateUserPathParamSchema': updateUserPathParamSchema,
    'updateUserSchema': updateUserSchema
};