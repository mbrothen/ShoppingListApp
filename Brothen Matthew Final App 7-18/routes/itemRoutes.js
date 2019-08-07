const express = require('express');
const router = express.router();
const itemController = require('../controller/itemController');
const joiSchemaValidation = require('../helper/joiSchemaValidation');
const itemSchema = require('../models/api/itemSchema');
const tokenValidation = require('../helper/tokenValidation');

//Add Item to either list, pass which list in the schema
router.post('/addItem', 
    tokenValidation.validateToken(), 
    joiSchemaValidation.validateBody(itemSchema.createItemSchema),
    itemController.addItem);

//Change the qty of an item for either list  
//May change to seperate route for each list?  Currently will just require the 
//List to be named in the query.  Current implementation can allow for customer
//user lists in the future if needed.
router.post('/changeItemQty',
    tokenValidation.validateToken(),
    joiSchemaValidation.validateBody(itemSchema.changeItemQuantitySchema),
    itemController.changeItemQty
    );

//Update an item  Changes item attributes, not list totals
router.put('/update/:itemId',
    tokenValidation.validateToken(),
    joiSchemaValidation.validatePathParams(itemSchema.updateItemPathParamSchema),
    joiSchemaValidation.validateBody(itemSchema.updateItemSchema),
    itemController.updateItem);

//Grab a list 
router.get('/list', 
    tokenValidation.validateToken(),
    joiSchemaValidation.validateQueryParams(itemSchema.getItemListSchema),
    itemController.getItemList);

router.delete('/remove/:itemId',
    tokenValidation.validateToken(),
    joiSchemaValidation.validatePathParams(itemSchema.deleteItemPathParamSchema),
    itemController.deleteItem);

module.exports = router;