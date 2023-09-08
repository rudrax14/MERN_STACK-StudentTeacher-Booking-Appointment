const { setRole, allow } = require("../controllers/adminController")
const { login, updatePassword, verifyToken } = require("../controllers/authController")
const express = require('express')
const { createAppointment, deleteAppointment } = require("../controllers/teacherController")
const router = express.Router()

router.post('/login',login)
router.patch('/updatePassword',verifyToken,updatePassword)
router.post('/schedule',verifyToken,allow('admin','teacher'),createAppointment)
router.delete('/removeSchedule/:id',verifyToken,allow('admin','teacher'),deleteAppointment)


module.exports = router