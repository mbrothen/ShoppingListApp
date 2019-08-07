const constants = require('../constants/constants');
const userService = require('../services/userService');
module.exports.createUser = async (req, res, next) => {
    let responseObj = {};
    try {
        let data = req.body;
        // Salt and Hash Password
        data.password = await userService.hashPassword(data.password);
        console.log('data after hashing: ', data);
        // test response
        let responseFromService = await userService.createUser(data);
        switch (responseFromService.status) {                       //TODO: THESE ARE REPETITIVE FUNCTION THESE
            case constants.serviceStatus.USER_CREATED_SUCCESSFULLY:
                responseObj.status = 200;
                responseObj.message = constants.serviceStatus.USER_CREATED_SUCCESSFULLY;
                responseObj.body = responseFromService.body;
                break;
            default:
                responseObj = constants.responseObj;
                break;
        }
        res.status(responseObj.status).send(responseObj);
    } catch (err) {
        console.log('Something wrong in controller: create user', err);
        responseObj = constants.responseObj;
        res.status(responseObj.status).send(responseObj);
    }
};

module.exports.getUserList = async (req, res, next) => {
    let responseObj = {};
    try {
        console.log('get user list try');
        let data = {
            skip: req.query.skip,
            limit: req.query.limit
        };
        let responseFromService = await userService.getUserList(data);
        switch (responseFromService.status) {                               //TODO: THESE ARE REPETITIVE FUNCTION THESE
            case constants.serviceStatus.USER_LIST_FETCHED_SUCCESSFULLY:
                responseObj.status = 200;
                responseObj.message = constants.serviceStatus.USER_LIST_FETCHED_SUCCESSFULLY;
                responseObj.body = responseFromService.body;
                break;
            default:
                responseObj = constants.responseObj;
                break;
        }
        res.status(responseObj.status).send(responseObj);
    } catch (err) {
        console.log('Something wrong in controller: getUserList user', err);
        responseObj = constants.responseObj;
        res.status(responseObj.status).send(responseObj);
    }
};

module.exports.getUserDetail = async (req, res, next) => {
    let responseObj = {};
    try {
        console.log('get user list try');
        let data = {
            userId: req.params.userId
        };
        let responseFromService = await userService.getUserDetail(data);
    switch (responseFromService.status) {                                   //TODO: THESE ARE REPETITIVE FUNCTION THESE
            case constants.serviceStatus.USER_FETCHED_SUCCESSFULLY:
                responseObj.status = 200;
                responseObj.message = constants.serviceStatus.USER_FETCHED_SUCCESSFULLY;
                responseObj.body = responseFromService.body;
                break;
            default:
                responseObj = constants.responseObj;
                break;
        }
        res.status(responseObj.status).send(responseObj);
    } catch (err) {
        console.log('Something wrong in controller: getUserList user', err);
        responseObj = constants.responseObj;
        res.status(responseObj.status).send(responseObj);
    }
};

module.exports.updateUser = async (req, res, next) => {
    let responseObj = {};
    try {
        let data = {
            userId: req.params.userId,
            name: req.body.name,
            phone: req.body.phone,
            password: req.body.password,
        };
        let responseFromService = await userService.updateUser(data);
        switch (responseFromService.status) {                           //TODO: THESE ARE REPETITIVE FUNCTION THESE
            case constants.serviceStatus.USER_UPDATED_SUCCESSFULLY:
                responseObj.status = 200;
                responseObj.message = constants.serviceStatus.USER_UPDATED_SUCCESSFULLY;
                responseObj.body = responseFromService.body;
                break;
            default:
                responseObj = constants.responseObj;
                break;
        }
        return res.status(responseObj.status).send(responseObj);
    } catch (err) {
        console.log('Something went wrong: Controller: update user', err);
        responseObj = constants.responseObj;
        return res.status(responseObj.status).send(responseObj);
    }
};
module.exports.deleteUser = async (req, res, next) => {
    let responseObj = {};
    try {
        let data = {
            userId: req.params.userId,
        };
        let responseFromService = await userService.deleteUser(data);
        switch (responseFromService.status) {                           //TODO: THESE ARE REPETITIVE FUNCTION THESE
            case constants.serviceStatus.USER_DELETED_SUCCESSFULLY:
                responseObj.status = 204;
                responseObj.message = constants.serviceStatus.USER_DELETED_SUCCESSFULLY;
                responseObj.body = responseFromService.body;
                break;
            default:
                responseObj = constants.responseObj;
                break;
        }
        return res.status(responseObj.status).send(responseObj);
    } catch (err) {
        console.log('Something went wrong: Controller: delete user', err);
        responseObj = constants.responseObj;
        return res.status(responseObj.status).send(responseObj);
    }
};

module.exports.authenticateUser = async (req, res, next) => {
    let responseObj = {};
    try {
        let data = {
            username: req.body.username,
            password: req.body.password
        };
        //hash plaintext password  ---  Not needed, hashes on check  --- faster?
 //       data.password = await userService.hashPassword(data.password);

        let responseFromService = await userService.authenticateUser(data);

        switch (responseFromService.status) {               //TODO: THESE ARE REPETITIVE FUNCTION THESE
            case constants.serviceStatus.USER_AUTHENTICATED_SUCCESSFULLY:
                responseObj.status = 200;
                responseObj.message = constants.serviceStatus.USER_AUTHENTICATED_SUCCESSFULLY;
                responseObj.body = responseFromService.body;
                break;
            case constants.serviceStatus.INVALID_CREDINTIALS:
                responseObj.status = 200;
                responseObj.message = constants.serviceStatus.INVALID_CREDINTIALS;
                responseObj.body = responseFromService.body;
                break;
            default:
                responseObj = constants.responseObj;
                break;
        }
        return res.status(responseObj.status).send(responseObj);
    } catch (err) {
        console.log('Something went wrong: Controller: authenticate user', err);
        responseObj = constants.responseObj;
        return res.status(responseObj.status).send(responseObj);
    }
};