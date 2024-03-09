const express = require('express');
const { login, verifyToken } = require('../controllers/authController');
const { register, bookAppointment, getTeacherWithAppointments, registeredAppointments } = require('../controllers/studentController');
const { allow } = require('../controllers/adminController');
const router = express.Router();

router.get('/get', (req, res) => {
    res.send("Welcome to the student Tutor-Time API!")
})
router.route('/post').post((req, res) => {
    res.send("Welcome to the student Tutor-Time API!")
})
router.route('/register').post(register);
router.route('/login').post(login)
router.route('/appointment/:id').patch(verifyToken, allow('student'), bookAppointment)
router.route('/appointment/getTeachersWithAppointments').get(verifyToken, allow('student'), getTeacherWithAppointments)
router.route('/appointment/getRegisteredAppointments').get(verifyToken, allow('student'), registeredAppointments)


module.exports = router