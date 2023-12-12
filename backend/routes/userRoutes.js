const express = require('express');
const router = express.Router();
const userController = require('../controller/usersController')

router.route('/')
    .get(userController.getAllusers)
    .post(userController.createUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)


module.exports = router;