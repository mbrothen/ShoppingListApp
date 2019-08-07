const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const joiSchemaValidation = require('../helper/joiSchemaValidation');
const userSchema = require('../models/api/userSchema');
const tokenValidation = require('../helper/tokenValidation');
//api/vi/user

router.post('/authenticate', joiSchemaValidation.validateBody(userSchema.authenticateUserSchema), userController.authenticateUser);

router.post('/', 
joiSchemaValidation.validateBody(userSchema.createUserSchema), 
userController.createUser);

/*  TODO:  Need to restrict this route admins */
router.get('/list', 
tokenValidation.validateToken(), 
joiSchemaValidation.validateQueryParams(userSchema.getUserListQuerySchema), 
userController.getUserList);

/*  TODO:  Need to restrict this route to only matching user IDs */
router.get('/detail/:userId', 
tokenValidation.validateToken(), 
joiSchemaValidation.validatePathParams(userSchema.getUserDetailPathParamSchema), 
userController.getUserDetail);

/*  TODO:  Need to restrict this route to only matching user IDs */
router.put('/update/:userId', 
tokenValidation.validateToken(), 
joiSchemaValidation.validatePathParams(userSchema.updateUserPathParamSchema), 
joiSchemaValidation.validateBody(userSchema.updateUserSchema), 
userController.updateUser);

/*  TODO:  Need to restrict this route to only matching user IDs */
router.delete('/remove/:userId', 
tokenValidation.validateToken(), 
joiSchemaValidation.validatePathParams(userSchema.deleteUserPathParamSchema), 
userController.deleteUser);

module.exports = router;