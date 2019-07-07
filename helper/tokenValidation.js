const jwt = require('jsonwebtoken');
const constants = require('../constants/constants');

let responseObj = {}
module.exports = {
    validateToken: () =>{
        return(req, res, next) => {
            const bearerHeader = req.headers['authorization'];
            const token = bearerHeader.split(' ')[1];
            if(token) {
                const decoded = jwt.verify(token, process.env.SECRET_KEY);
                console.log(decoded);
                jwt.verify(token, process.env.SECRET_KEY, (err, authData)=> {
                    if(err) {
                        responseObj.message = constants.controllerStatus.INVALID_TOKEN;
                        responseObj.status = 400;
                        responseObj.body = {};
                        return res.status(responseObj.status).send(responseObj);
                    } else {
                        next();
                    }
                });

            } else {
                responseObj.message = constants.controllerStatus.TOKEN_MISSING;
                responseObj.status = 400;
                responseObj.body = {};
                return res.status(responseObj.status).send(responseObj);
            }
        };
    }
};