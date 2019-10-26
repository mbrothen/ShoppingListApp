const constants = require('../constants/constants');
const User = require('../models/db/userModel');
const crudRepository = require('../database/crudRepository');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.createUser = async (serviceData) => {
    let responseObj = {};
    try {
        const user = new User({
            username: serviceData.username,
            password: serviceData.password,
            name: serviceData.name,
            email: serviceData.email,
            phone: serviceData.phone,
        });
        let data = {
            model: user
        };

        let responseFromDatabase = await crudRepository.insertData(data);
        switch (responseFromDatabase.status) {
            case constants.databaseStatus.ENTITY_CREATED:
                responseObj.body = responseFromDatabase.result;
                responseObj.status = constants.serviceStatus.USER_CREATED_SUCCESSFULLY;
                break;
            default:
                responseObj = constants.responseObj;
                break;
        }
        return responseObj;
    } catch (err) {
        console.log('Error: Service: Create user: ', err);
        return responseObj = constants.responseObj;
    }
};

module.exports.getUserList = async (serviceData) => {
    let responseObj = {};
    try {
        let data = {
            query: {},
            model: User,
            excludeFields: ''
        };
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
                responseObj.body = responseFromDatabase.result;
                responseObj.status = constants.serviceStatus.USER_LIST_FETCHED_SUCCESSFULLY;
                break;
            default:
                responseObj = constants.responseObj;
                break;
        }
        return responseObj;
    } catch (err) {
        console.log('Something went wrong: Service: get user list:', err);
        return responseObj = constants.responseObj;
    }
};

module.exports.getUserDetail = async (serviceData) => {
    let responseObj = {};
    try {
        let data = {
            query: {
                _id: mongoose.Types.ObjectId(serviceData.userId)
            },
            model: User,
            excludeFields: ''
        };
        let responseFromDatabase = await crudRepository.find(data);
        switch (responseFromDatabase.status) {
            case constants.databaseStatus.ENTITY_FETCHED:
                responseObj.body = responseFromDatabase.result;
                responseObj.status = constants.serviceStatus.USER_FETCHED_SUCCESSFULLY;
                break;
            default:
                responseObj = constants.responseObj;
                break;
        }
        return responseObj;
    } catch (err) {
        console.log('Something went wrong: Service: get user detail:', err);
        return responseObj = constants.responseObj;
    }
};

module.exports.updateUser = async (serviceData) => {
    let responseObj = {};
    try {
        let data = {
            findQuery: {
                _id: mongoose.Types.ObjectId(serviceData.userId)
            },
            model: User,
            updateQuery: {}
        };
        if (serviceData.name) {
            data.updateQuery.name = serviceData.name;
        }
        if (serviceData.password) {
            data.updateQuery.password = serviceData.password;
        }
        if (serviceData.phone) {
            data.updateQuery.phone = serviceData.phone;
        }
        let responseFromDatabase = await crudRepository.findOneAndUpdate(data);
        switch (responseFromDatabase.status) {
            case constants.databaseStatus.ENTITY_MODIFIED:
                responseObj.body = responseFromDatabase.result;
                responseObj.status = constants.serviceStatus.USER_UPDATED_SUCCESSFULLY;
                break;
            default:
                responseObj = constants.responseObj;
                break;
        }
        return responseObj;
    } catch (err) {
        console.log('Something went wrong: Service: update user detail:', err);
        return responseObj = constants.responseObj;
    }
};
module.exports.deleteUser = async (serviceData) => {
    let responseObj = {};
    try {
        let data = {
            findQuery: {
                _id: mongoose.Types.ObjectId(serviceData.userId)
            },
            model: User,
        };
        let responseFromDatabase = await crudRepository.deleteOne(data);
        switch (responseFromDatabase.status) {
            case constants.databaseStatus.ENTITY_DELETED:
                responseObj.body = responseFromDatabase.result;
                responseObj.status = constants.serviceStatus.USER_DELETED_SUCCESSFULLY;
                break;
            default:
                responseObj = constants.responseObj;
                break;
        }
        return responseObj;
    } catch (err) {
        console.log('Something went wrong: Service: update user detail:', err);
        return responseObj = constants.responseObj;
    }
};
module.exports.authenticateUser = async (serviceData) => {
    let responseObj = {};
    try {
        let data = {
            findOneQuery: {
                query: {
                    username: serviceData.username,
                }
            },
            model: User,
        };
        let responseFromDatabase = await crudRepository.findOne(data);
        console.log('userID: ', responseFromDatabase.result); //Trying to find userId to add to token
        let userId = responseFromDatabase.result._id; //adding id to token to use with requests to tablesclear
        if (responseFromDatabase.status === constants.databaseStatus.ENTITY_FETCHED && responseFromDatabase.result) {
            let samePassword = await compareHashedPasswords(serviceData, responseFromDatabase);
            console.log(samePassword);
            if (compareHashedPasswords(serviceData, responseFromDatabase)){
                const token = jwt.sign({
                    userType: 'user',
                    userId: userId
                }, process.env.SECRET_KEY); //Add user id# to jwt to retreive specifc lists 
                responseObj.status = constants.serviceStatus.USER_AUTHENTICATED_SUCCESSFULLY;
                responseObj.body = {
                    "token": token
                };
            } else{
                console.log('Invalid password :(');
                responseObj.status = constants.serviceStatus.IVNALID_PASSWORD;
                responseObj.body = {};
            }
        } else {
            console.log('invalid credentials :(');
            responseObj.status = constants.serviceStatus.INVALID_USERNAME;
            responseObj.body = {};
        }

        return responseObj;
    } catch (err) {
        console.log('Something went wrong: Service: authenticate user:', err);
        return responseObj = constants.responseObj;
    }
};
const compareHashedPasswords = async (serviceData, responseFromDatabase) => {
    let enteredPassword = serviceData.password;
    let retreivedPassword = responseFromDatabase.result.password;
    bcrypt.compare(enteredPassword, retreivedPassword, function(res, err) {
            console.log('compare results: ', res);
            if (res) {
                return true;
            } else {
                return false;
            }
    });
};

module.exports.hashPassword = async (serviceData) => {
    const hashedPassword = '';
    const saltRounds = 10;
    return new Promise(function(resolve, reject) {
        try {
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(serviceData, salt, function (err, hash) {
    
                    console.log('hashed password: ', hash);
                    resolve(hash);
                });
            });
        } catch (err) {
            return (constants.serviceStatus.HASH_FAILURE, err);
        }
    });
};
