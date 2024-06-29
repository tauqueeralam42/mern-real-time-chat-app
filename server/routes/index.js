const express = require('express');
const registerUser = require('../controller/registerUser');
const checkEmail = require('../controller/checkEmail');
const checkPassword = require('../controller/checkPassword');
const userDetails = require('../controller/userDetails');

const router = express.Router();

//create new user api
router.post('/register',registerUser);

//check user email exist or not
router.post('/email',checkEmail);

//check user password
router.post('/password',checkPassword);

//get login user details
router.get('/user-details',userDetails);


module.exports = router;