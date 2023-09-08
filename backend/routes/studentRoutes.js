const express=require('express');
const { login } = require('../controllers/authController');
const { register } = require('../controllers/studentController');
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login)


module.exports = router