const constants = require('../constants/constants');
const User = require('../models/db/userModel');
const crudRepository = require('../database/crudRepository');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
module.exports.createUser = async (serviceData) => {
    let responseObj = {};
    try {
        const user = new User({
            name: serviceData.name,
            password: serviceData.password,
            phone: serviceData.phone,
        });
        let data = {
            model: user
        };

        let responseFromDatabase = await crudRepository.insertData(data);
        switch(responseFromDatabase.status) {
            case constants.databaseStatus.ENTITY_CREATED:
                responseObj.body = responseFromDatabase.result;
                responseObj.status = constants.serviceStatus.USER_CREATED_SUCCESSFULLY;
                break;
            default:
                responseObj = constants.responseObj;
                break;
        }
        return responseObj;
    } catch(err) {
        console.log('Error: Service: Create user: ', err);
        return responseObj = constants.responseObj;
    }
};

module.exports.getUserList = async (serviceData) => {
    let responseObj = {};
    try{
        let data = {
            query: {},
            model: User,
            excludeFields: ''
        };
        if(serviceData.skip && serviceData.limit) {
            data.pagination = {
                skip: parseInt(serviceData.skip),
                limit: parseInt(serviceData.limit)
            };
        } else {
            data.pagination = {};
        }
        let responseFromDatabase = await crudRepository.find(data);
        switch(responseFromDatabase.status) {
            case constants.databaseStatus.ENTITY_FETCHED:
                responseObj.body = responseFromDatabase.result;
                responseObj.status = constants.serviceStatus.USER_LIST_FETCHED_SUCCESSFULLY;
                break;
            default:
                responseObj = constants.responseObj;
                break;
        }
        return responseObj;
    }catch(err) {
        console.log('Something went wrong: Service: get user list:', err);
        return responseObj = constants.responseObj;
    }
};

module.exports.getUserDetail = async (serviceData) => {
    let responseObj = {};
    try{
        let data = {
            query: {
                _id: mongoose.Types.ObjectId(serviceData.userId)
            },
            model: User,
            excludeFields: ''
        };
        let responseFromDatabase = await crudRepository.find(data);
        switch(responseFromDatabase.status) {
            case constants.databaseStatus.ENTITY_FETCHED:
                responseObj.body = responseFromDatabase.result;
                responseObj.status = constants.serviceStatus.USER_FETCHED_SUCCESSFULLY;
                break;
            default:
                responseObj = constants.responseObj;
                break;
        }
        return responseObj;
    }catch(err) {
        console.log('Something went wrong: Service: get user detail:', err);
        return responseObj = constants.responseObj;
    }
};

module.exports.updateUser = async (serviceData) => {
    let responseObj = {};
    try{
        let data = {
            findQuery: {
                _id: mongoose.Types.ObjectId(serviceData.userId)
            },
            model: User,
            updateQuery: {}
        };
        if(serviceData.name) {
            data.updateQuery.name = serviceData.name;
        }
        if(serviceData.password) {
            data.updateQuery.password = serviceData.password;
        }
        if(serviceData.phone) {
            data.updateQuery.phone = serviceData.phone;
        }
        let responseFromDatabase = await crudRepository.findOneAndUpdate(data);
        switch(responseFromDatabase.status) {
            case constants.databaseStatus.ENTITY_MODIFIED:
                responseObj.body = responseFromDatabase.result;
                responseObj.status = constants.serviceStatus.USER_UPDATED_SUCCESSFULLY;
                break;
            default:
                responseObj = constants.responseObj;
                break;
        }
        return responseObj;
    }catch(err) {
        console.log('Something went wrong: Service: update user detail:', err);
        return responseObj = constants.responseObj;
    }
};
module.exports.deleteUser = async (serviceData) => {
    let responseObj = {};
    try{
        let data = {
            findQuery: {
                _id: mongoose.Types.ObjectId(serviceData.userId)
            },
            model: User,
        };
        let responseFromDatabase = await crudRepository.deleteOne(data);
        switch(responseFromDatabase.status) {
            case constants.databaseStatus.ENTITY_DELETED:
                responseObj.body = responseFromDatabase.result;
                responseObj.status = constants.serviceStatus.USER_DELETED_SUCCESSFULLY;
                break;
            default:
                responseObj = constants.responseObj;
                break;
        }
        return responseObj;
    }catch(err) {
        console.log('Something went wrong: Service: update user detail:', err);
        return responseObj = constants.responseObj;
    }
};

module.exports.authenticateUser = async (serviceData) => {
    let responseObj = {};
    try{
        let data = {
            findQuery: {
                query: {
                    name: serviceData.name,
                    password: serviceData.password
                }
            },
            model: User,
        };
        let responseFromDatabase = await crudRepository.find(data);
        console.log('userID: ', responseFromDatabase.result);  //Trying to find userId to add to token
        if(responseFromDatabase.status === constants.databaseStatus.ENTITY_FETCHED && responseFromDatabase.result.length > 0) {
            const token = jwt.sign({userType: 'admin'}, process.env.SECRET_KEY);  //Add user id# to jwt to retreive specifc lists 
            responseObj.status = constants.serviceStatus.USER_AUTHENTICATED_SUCCESSFULLY;
            responseObj.body = {
                "token": token
            };
        } else {
            responseObj.status = constants.serviceStatus.INVALID_CREDINTIALS;
            responseObj.body = {};
        }

        return responseObj;
    }catch(err) {
        console.log('Something went wrong: Service: authenticate user:', err);
        return responseObj = constants.responseObj;
    }
};