const constants = require('../constants/constants');
const Item = require('../models/db/itemModel');
const crudRepository = require('../database/crudRepository');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.createItem = async (serviceData) => {
    let responstObj = {};
    try {
/* 
TODO:  Get user ID first....Add it to all the service data as userID before sending?  Function for all CRUD calls.  Call before other itemService calls to add to the req body
*/
        const item = new Item({
            itemId: servicdeData.itemId,
            itemName: serviceData.itemName,
            itemDescription: serviceData.itemDescription,
            itemCategory: serviceData.itemCategory,
            shoppingListQty: servicdeData.shoppingListQty,
            pantryListQty: serviceData.pantryListQty
        });
        let data = {
            model: item
        };

    }
};