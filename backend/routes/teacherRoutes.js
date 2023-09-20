const { setRole, allow } = require("../controllers/adminController")
const { login, updatePassword, verifyToken } = require("../controllers/authController")
const express = require('express')
const { createAppointment, deleteAppointment, getAllAppointments, getAllStudents } = require("../controllers/teacherController")
const router = express.Router()

router.post('/login',login)
router.patch('/updatePassword',verifyToken,updatePassword)
router.route('/schedule').get(verifyToken,allow('admin','teacher'),getAllAppointments).post(verifyToken,allow('admin','teacher'),createAppointment)
router.delete('/removeSchedule/:id',verifyToken,allow('admin','teacher'),deleteAppointment)

router.route('/').get(getAllStudents);
module.exports = router