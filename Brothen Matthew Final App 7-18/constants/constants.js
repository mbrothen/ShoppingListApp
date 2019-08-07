module.exports = {
    responseObj: {
        status: 500,
        message: 'Internal server error',
        body: {}
    },
    databaseStatus: {
        ENTITY_CREATED: 'Entity created',
        ENTITY_MODIFIED: 'Entity Modified',
        ENTITY_FETCHED: 'Entity Fetched',
        ENTITY_DELETED: 'Entity Deleted',
        DATABASE_CONNECTED: 'Database connected successfully',
        DATABSE_ERROR: 'Database error'
    },
    controllerStatus: {
        BAD_REQUEST: 'Required fields missing',
        TOKEN_MISSING: 'Token Missing',
        INVALID_TOKEN: 'Invalid token'

    }, 
    serviceStatus: {
        HASH_FAILURE: 'Failed to hash password',
        INVALID_CREDINTIALS: 'Name or password is incorrect',
        INVALID_USERNAME: 'Username not found',
        IVNALID_PASSWORD: 'Incorrect passsword entered',
        ITEM_CREATED_SUCCESSFULLY: 'Item created successsfully',
        USER_CREATED_SUCCESSFULLY: 'User created successfully',
        USER_LIST_FETCHED_SUCCESSFULLY: 'User list fetched successfully',
        USER_FETCHED_SUCCESSFULLY: 'User detail fetched successfully',
        USER_UPDATED_SUCCESSFULLY: 'User updated successfully',
        USER_DELETED_SUCCESSFULLY: 'User has been deleeted successfully',
        USER_AUTHENTICATED_SUCCESSFULLY: 'User has been authenticated successfully',
    }
};