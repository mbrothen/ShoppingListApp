const constants = require('../constants/constants');
const itemService = require('../services/itemService.js');

module.exports.addItem = async (req, res, next) => {
    let responseObj = {};
    try {
        let data = req.body;
        let responseFromService = await itemService.createItem(data);
        switch (responseFromService.status) {
            case constants.serviceStatus.ITEM_CREATED_SUCCESSFULLY:
                responseObj.status = 200;
                responseObj.message = constants.serviceStatus.ITEM_CREATED_SUCCESSFULLY;
                responseObj.body = responseFromService.body;
                break;
            default:
                responseObj = constants.responseObj;
                break;
        }
        res.status(responseObj.status).send(responseObj);
    } catch (err) {
        console.log('Something wrong in controller: create item');
        console.log('ResponseObj', responseObj);
        responseObj = constants.responseObj;
        res.status(responseObj.status).send(responseObj);
    }
};

module.exports.getItemList = async (req, res, next) => {
    let responseObj = {};
    try {
        console.log('get item list');
        let data = {
            userId: req.body.userId,
            list: req.body.list
        };
        let responseFromService = await itemService.getItemList(data);
        switch (responseFromService.status) {                               
            case constants.serviceStatus.ITEM_LIST_FETCHED_SUCCESSFULLY:
                responseObj.status = 200;
                responseObj.message = constants.serviceStatus.ITEM_LIST_FETCHED_SUCCESSFULLY;
                responseObj.body = responseFromService.body;
                break;
            default:
                responseObj = constants.responseObj;
                break;
        }
        res.status(responseObj.status).send(responseObj);
    } catch (err) {
        console.log('Something wrong in item controller: getItem user', err);
        responseObj = constants.responseObj;
        res.status(responseObj.status).send(responseObj);
    }
};

module.exports.changeItemQty = async (req, res, next) => {
    let responseObj = {};
    try {
        let data = {
            userId: req.body.userId,
            itemId: req.params.itemId,
            shoppingListQty: req.body.shoppingListQty,
            pantryListQty: req.body.pantryListQty
        };
        let responseFromService = await itemService.changeItemQty(data);
        switch (responseFromService.status) {                           //TODO: THESE ARE REPETITIVE FUNCTION THESE
            case constants.serviceStatus.ITEM_LIST_QTY_UPDATED_SUCCESSFULLY:
                responseObj.status = 200;
                responseObj.message = constants.serviceStatus.ITEM_LIST_QTY_UPDATED_SUCCESSFULLY;
                responseObj.body = responseFromService.body;
                break;
            default:
                responseObj = constants.responseObj;
                break;
        }
        return res.status(responseObj.status).send(responseObj);
    } catch (err) {
        console.log('Something went wrong: Item Controller: Change Item Qty', err);
        responseObj = constants.responseObj;
        return res.status(responseObj.status).send(responseObj);
    }
};