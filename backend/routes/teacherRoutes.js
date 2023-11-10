const { setRole, allow } = require("../controllers/adminController")
const { login, updatePassword, verifyToken } = require("../controllers/authController")
const express = require('express')
const { createAppointment, deleteAppointment, getAllAppointments, getAllStudents, approveAppointment, dissapproveAppointment, getAllPendingStudents } = require("../controllers/teacherController")
const router = express.Router()

router.route('/').get(getAllStudents);
router.post('/login', login)
router.patch('/updatePassword', verifyToken, updatePassword)

router.route('/schedule').get(verifyToken, allow('admin', 'teacher'), getAllAppointments).post(verifyToken, allow('admin', 'teacher'), createAppointment)

router.route('/reschedule/:id').delete(verifyToken,allow('teacher'),deleteAppointment);

router.route('/changeApprovalStatus/:id/:studentId').delete(verifyToken, allow('admin', 'teacher'), dissapproveAppointment).patch(verifyToken,allow('admin','teacher'),approveAppointment)

router.route('/getAllPendingStudents').get(verifyToken,allow('teacher'),getAllPendingStudents);
module.exports = router