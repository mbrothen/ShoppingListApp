const Joi = require('joi');
const constants = require('../constants/constants');

let responseObj = {};

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if(result.error) {
                let errorDetail = result.error.details.map((value) => {
                    return {
                        error: value.message,
                        path: value.path
                    };
                });
                responseObj.status = 400;
                responseObj.message = constants.controllerStatus.BAD_REQUEST;
                responseObj.body = errorDetail;
                return res.status(responseObj.status).send(responseObj);
            } else {
                next();
            }
        };
    },
    validateQueryParams: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.query, schema);
            if(result.error) {
                let errorDetail = result.error.details.map((value) => {
                    return {
                        error: value.message,
                        path: value.path
                    };
                });
                responseObj.status = 400;
                responseObj.message = constants.controllerStatus.BAD_REQUEST;
                responseObj.body = errorDetail;
                return res.status(responseObj.status).send(responseObj);
            } else {
                next();
            }
        };
    },
    validatePathParams: (schema) => {
        return (req, res, next) => {
            console.log('Validating parameters');
            console.log('req.params: ', req.params);
            console.log('schema: ', schema);
            const result = Joi.validate(req.params, schema);
            if(result.error) {
                let errorDetail = result.error.details.map((value) => {
                    return {
                        error: value.message,
                        path: value.path
                    };
                });
                responseObj.status = 400;
                responseObj.message = constants.controllerStatus.BAD_REQUEST;
                responseObj.body = errorDetail;
                return res.status(responseObj.status).send(responseObj);
            } else {
                next();
            }
        };
    }
};