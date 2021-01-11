var express = require('express');
var userController = require('./routes/userController');


//Router

exports.router = (function() {
    var apiRouter = express.Router();

    // Users Routes

    apiRouter.route('/users/register/').post(userController.register);
    apiRouter.route('/users/login/').post(userController.login);

    return apiRouter;
})();