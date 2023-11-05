const Appointment = require('../models/Appointment');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const sendEmail = require('../utils/sendEmail');
const { signToken } = require('./authController');

exports.register = catchAsync(
    async (req, res, next) => {
        const user = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            department: req.body.department,
            age: req.body.age
        }
        const newUser = await User.create(user);
        newUser.password = undefined
        const token = await signToken(newUser._id, newUser.roles)
        res.status(200).json({
            status: 'SUCCESS',
            message: "Student created",
            data: {
                newUser
            },
            token
        })
    }
)

exports.bookAppointment = catchAsync(async (req, res, next) => {






    const appointment = {
        _id: req.params.id,

        scheduleAt: new Date(2022, 10, 10, 2, 0, 0).toString(),

    }
    const existingStudent = await Appointment.findOne({"students.studentId":req.user.id})
    if(existingStudent){
        return next(new AppError("You have already booked the appointment",500));
    }
    const newAppointment = await Appointment.findOneAndUpdate(appointment, { $push: { students: { studentId: req.user.id, approved: false } } })

    const message = `I like to book an appointment on ${newAppointment.scheduleAt}. Reason:${newAppointment.reason}`
    //await sendEmail(req.body.sendBy,req.body.sendTo,"Appointment Booking",message) 
    res.status(200).json({
        status: 'SUCCESS',
        data: {
            newAppointment
        }
    })
})
