const mongoose = require('mongoose');
const constants = require('../constants/constants');
module.exports.createConnection = () => {
    return new Promise((resolve, reject) => {
        let responseObj = {};
        mongoose.connect(process.env.DB_URL, {useNewUrlParser: true}, (err) => {
            if(err) {
                responseObj.status = constants.databaseStatus.DATABSE_ERROR;
                console.log('responseObj', responseObj);
                return reject(responseObj);
            } else{
                responseObj.status = constants.databaseStatus.DATABASE_CONNECTED;
                console.log('responseObj', responseObj);
                return resolve(responseObj);
            }
        });
    });
};

module.exports.insertData = (data) => {
    return new Promise((resolve, reject) => {
        console.log('Insert Data called');
        try {
            data.model.save().then(docs => {
                resolve({
                    result: docs,
                    status: constants.databaseStatus.ENTITY_CREATED
                });
            }).catch (err => {
                //error
                reject({
                    error: err.message,
                    status: constants.databaseStatus.DATABSE_ERROR
                });
                
            });
        } catch(err) {
            console.log('Database insert error: Crud Repository', err);
        }
    });
};

    /* 
    Might switch to find user first, then verify password.  This will allow hashing to happen when user is searched speeding up program
    */
module.exports.find = (data) => {
    return new Promise((resolve, reject) => {
        console.log('Find Data called');
        try {
            data.model.find(data.query, data.excludeFields, data.pagination).then(docs => {
                resolve({
                    result: docs,
                    status: constants.databaseStatus.ENTITY_FETCHED
                });
            }).catch (err => {
                //error
                reject({
                    error: err.message,
                    status: constants.databaseStatus.DATABSE_ERROR
                });
                
            });
        } catch(err) {
            console.log('Database find error: Crud Repository', err);
        }
    });
};

module.exports.findOne = (data) => {
    return new Promise((resolve, reject) => {
        console.log('Find One Data called');
        try {
            console.log('FIND ONE: data.query', data.findOneQuery);
            data.model.findOne(data.findOneQuery.query).then(docs => {
                console.log('docs', docs);
                resolve({
                    result: docs,
                    status: constants.databaseStatus.ENTITY_FETCHED
                });
            }).catch (err => {
                //error
                reject({
                    error: err.message,
                    status: constants.databaseStatus.DATABSE_ERROR
                });
                
            });
        } catch(err) {
            console.log('Database find one error: Crud Repository', err);
        }
    });
};

module.exports.findOneAndUpdate = (data) => {
    return new Promise((resolve, reject) => {
        try {
            data.model.findOneAndUpdate(data.findQuery, data.updateQuery, {new: true}).then(docs => {
                //success
                console.log('DOCS: ', docs);
                resolve({
                    result: docs,
                    status: constants.databaseStatus.ENTITY_MODIFIED
                });
            }).catch(err => {
                //error
                reject({
                    error: err.message,
                    status: constants.databaseStatus.DATABASE_ERROR
                });
            });
        }catch(err) {
            console.log('Something went wrong: CrudRepository: findOneAndUpdate', err)
        }
    });
};

module.exports.deleteOne = (data) => {
    return new Promise((resolve, reject) => {
        try {
            data.model.deleteOne(data.findQuery).then(docs => {
                //success
                resolve({
                    result: docs,
                    status: constants.databaseStatus.ENTITY_DELETED
                });
            }).catch(err => {
                //error
                reject({
                    error: err.message,
                    status: constants.databaseStatus.DATABASE_ERROR
                });
            });
        }catch(err) {
            console.log('Something went wrong: CrudRepository: deleteOne', err)
        }
    });
};