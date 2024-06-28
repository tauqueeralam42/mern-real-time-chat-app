const express = require('express');
const registerUser = require('../controller/registerUser');
const checkEmail = require('../controller/checkEmail');

const router = express.Router();

//create new user api
router.post('/register',registerUser);

//check user email exist or not
router.post('/email',checkEmail)


module.exports = router;