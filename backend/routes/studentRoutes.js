const express=require('express');
const { login, verifyToken } = require('../controllers/authController');
const { register, bookAppointment, getTeacherWithAppointments } = require('../controllers/studentController');
const { allow } = require('../controllers/adminController');
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login)
router.route('/appointment/:id').patch(verifyToken,allow('student'),bookAppointment)
router.route('/appointment/getTeachersWithAppointments').get(verifyToken,allow('student'),getTeacherWithAppointments)


module.exports = router