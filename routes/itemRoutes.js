const express = require('express');
const router = express.Router();
const itemController = require('../controller/itemController');
const joiSchemaValidation = require('../helper/joiSchemaValidation');
const itemSchema = require('../models/api/itemSchema');
const tokenValidation = require('../helper/tokenValidation');
const passport = require('passport');

//Add Item to either list, pass which list in the schema
router.post('/addItem', 
    tokenValidation.validateToken(), 
    joiSchemaValidation.validateBody(itemSchema.createItemSchema),
    itemController.addItem);

//Change the qty of an item for either list  
//May change to seperate route for each list?  Currently will just require the 
//List to be named in the query.  Current implementation can allow for customer
//user lists in the future if needed.

router.put('/changeItemQty/:itemId',
    tokenValidation.validateToken(),
    joiSchemaValidation.validatePathParams(itemSchema.changeItemQuantityPathParamSchema),
    joiSchemaValidation.validateBody(itemSchema.changeItemQuantitySchema),
    itemController.changeItemQty
    );
/*
//Update an item  Changes item attributes, not list totals
router.put('/update/:itemId',
    tokenValidation.validateToken(),
    joiSchemaValidation.validatePathParams(itemSchema.updateItemPathParamSchema),
    joiSchemaValidation.validateBody(itemSchema.updateItemSchema),
    itemController.updateItem);
*/

// Grab the item list or pantry list
// Send 'pantryList' or 'itemList' in json.  expandable to user created lists in the future
router.post('/itemList', 
    tokenValidation.validateToken(),
    joiSchemaValidation.validateQueryParams(itemSchema.getItemListSchema),
    itemController.getItemList);

/*
router.delete('/remove/:itemId',
    tokenValidation.validateToken(),
    joiSchemaValidation.validatePathParams(itemSchema.deleteItemPathParamSchema),
    itemController.deleteItem);
*/
module.exports = router;