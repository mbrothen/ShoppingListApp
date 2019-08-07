const constants = require('../constants/constants');
const Item = require('../models/db/itemModel');
const crudRepository = require('../database/crudRepository');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.createItem = async (serviceData) => {
    let responseObj = {};
    try {
/* 
TODO:  Get user ID first....Add it to all the service data as userID before sending?  Function for all CRUD calls.  Call before other itemService calls to add to the req body
*/
        console.log('ShoppingListQty: ' + serviceData.shoppingListQty + '  PantryListQty: ' + serviceData.pantryListQty);
        const item = new Item({
            userId: serviceData.userId,
            itemId: serviceData.itemId,
            itemName: serviceData.itemName,
            itemDescription: serviceData.itemDescription,
            itemCategory: serviceData.itemCategory,
            shoppingListQty: serviceData.shoppingListQty,
            pantryListQty: serviceData.pantryListQty
        });
        let data = {
            model: item
        };
        let responseFromDatabase = await crudRepository.insertData(data);
        switch (responseFromDatabase.status) {
            case constants.databaseStatus.ENTITY_CREATED:
                responseObj.body = responseFromDatabase.result;
                responseObj.status = constants.serviceStatus.ITEM_CREATED_SUCCESSFULLY;
                break;
            default:
                responseObj = constatns.responseObj;
                break;
        }
        return responseObj;
    } catch (err) {
        console.log('Error: Item Service: addItem: ', err);
        return responseObj = constants.responseObj;
    }
};

module.exports.getItemList = async (serviceData) => {
    let responseObj = {};
    let list = serviceData.list + 'Qty';
    try {
        let data = {
            query: {
                userId: serviceData.userId,
            },
            model: Item,
            excludeFields: ''
        };
       data.query[list] = { $gt : 0};  //Get items with positive value of specific list

        console.log('Data.Query: ', data.query);
        if (serviceData.skip && serviceData.limit) {
            data.pagination = {
                skip: parseInt(serviceData.skip),
                limit: parseInt(serviceData.limit)
            };
        } else {
            data.pagination = {};
        }
        let responseFromDatabase = await crudRepository.find(data);
        switch (responseFromDatabase.status) {
            case constants.databaseStatus.ENTITY_FETCHED:
                console.log('Response Obj: ', responseObj);
                responseObj.body = responseFromDatabase.result;
                responseObj.status = constants.serviceStatus.ITEM_LIST_FETCHED_SUCCESSFULLY;
                break;
            default:
                responseObj = constants.responseObj;
                break;
        }
        return responseObj;
    } catch (err) {
        console.log('Something went wrong: Service: get item list:', err);
        return responseObj = constants.responseObj;
    }
};

module.exports.changeItemQty = async (serviceData) => {
    console.log('change item qty service');
    let responseObj = {};
    try {
        let data = {
            findQuery: {
                //_id: mongoose.Types.ObjectId(serviceData._id)
                userId: serviceData.userId,
                _id: serviceData.itemId
            },
            model: Item,
            updateQuery: {}
        };
        data.updateQuery.$inc ={};
        if (serviceData.pantryListQty) {
            data.updateQuery.$inc.pantryListQty = serviceData.pantryListQty;
            data.updateQuery.$push = {};

            //Track dates of purchase and use based on adding or subtracting to the pantry list values
            if (serviceData.pantryListQty < 0) {
                data.updateQuery.$push.usedDates = new Date();
            } else {
                data.updateQuery.$push.purchaseDates = new Date();
            }

        }
        if (serviceData.shoppingListQty) {        data.updateQuery.$inc.shoppingListQty = serviceData.shoppingListQty;
        }
        console.log('Data: query: ', data);
        let responseFromDatabase = await crudRepository.findOneAndUpdate(data);
        switch (responseFromDatabase.status) {
            case constants.databaseStatus.ENTITY_MODIFIED:
                responseObj.body = responseFromDatabase.result;
                responseObj.status = constants.serviceStatus.ITEM_LIST_QTY_UPDATED_SUCCESSFULLY;
                break;
            default:
                responseObj = constants.responseObj;
                break;
        }
        return responseObj;
    } catch (err) {
        console.log('Something went wrong: Item Service: update Item List Qty:', err);
        return responseObj = constants.responseObj;
    }
};