const constants = require('../constants/constants');
const itemService = require('../services/itemService.js');

module.exports.createItem = async (req, res, next) => {
    try {
        let data = req.body;
        let responseFromService = await itemService.createItem(data);
        switch (responseFromService.status) {
            case ConstantSourceNode.serviceStatus.ITEM_CREATED_SUCCESSFULLY:
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
        responseObj = constants.responseObj;
        res.status(responseObj.status).send(responseObj);
    }
};

