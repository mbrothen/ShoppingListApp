const Joi = require('joi');

const createItemSchema = Joi.object().keys({
    userId: Joi.string().required(),
    itemName: Joi.string().required(),
    itemDescription: Joi.string().optional(),
    itemCategory: Joi.string().optional(),
    shoppingListQty: Joi.number().optional(),
    pantryListQty: Joi.number().optional(),
    purchaseDates: Joi.alternatives().try(Joi.array().items(Joi.date()), Joi.string()).optional(),
    usedDates: Joi.alternatives().try(Joi.array().items(Joi.date()), Joi.string()).optional()
});
/*****TODO WHY DOES REQUIRED NOT WORK ON THIS ONE???*****/
const getItemListSchema = Joi.object().keys({
    userId: Joi.string().optional(),
    list: Joi.string().valid('shoppingList', 'pantryList')
});

const changeItemQuantityPathParamSchema = Joi.object().keys({
    itemId: Joi.string().required()
});

const changeItemQuantitySchema = Joi.object().keys({
    userId: Joi.string().required(),
    _id: Joi.string().optional(),
    itemName: Joi.string().optional(),
    shoppingListQty: Joi.number().optional(),
    pantryListQty: Joi.number().optional()
});
/*
const getItemDetailPathParamSchema = Joi.object().keys({
    itemId: Joi.string().required()
});

const updateItemPathParamSchema = Joi.object().keys({
    userId: Joi.string().required(),
    list: Joi.string().valid('shoppingList', 'pantryList')
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


*/

module.exports = {
    'createItemSchema': createItemSchema,
    'getItemListSchema': getItemListSchema,
    'changeItemQuantityPathParamSchema': changeItemQuantityPathParamSchema,
    'changeItemQuantitySchema': changeItemQuantitySchema
};