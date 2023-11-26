const Appointment = require('../models/Appointment');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const {connect} = require('../utils/sendEmail');
const { signToken } = require('./authController');
const transporter = connect()

const getTeacherWithAppointments = async (id) => {
    return await Appointment.find({
       "students.studentId":{'$not':{'$eq':[id]}}    
    });
};

const getRegisteredAppointments = async (id) => {
    return await Appointment.find({
       "students.studentId":{'$eq':[id]}    
    });
};


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
        const token = await signToken(user._id, user.roles, user.name ,user.email,user.admissionStatus);
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

       

    }
    const existingStudent = await Appointment.findOne({"students.studentId":req.user.id})
    if(existingStudent){
        return next(new AppError("You have already booked the appointment",500));
    }
    const newAppointment = await Appointment.findOneAndUpdate(appointment, { $push: { students: { studentId: req.user.id, approved: false } } },{new:true})

    const message = `I like to book an appointment on ${newAppointment.scheduleAt} from a student.`
    //await sendEmail(req.body.sendBy,req.body.sendTo,"Appointment Booking",message) 
    let info = await transporter.sendMail({from:"abutalhasheikh33@gmail.com",to:newAppointment.sendBy,subject:"Book appointment",body:message})
    res.status(200).json({
        status: 'SUCCESS',
        data: {
            newAppointment
        }
    })
})


exports.getTeacherWithAppointments = catchAsync(async (req,res,next)=>{
    const appointments = await getTeacherWithAppointments(req.user.id);
    res.status(200).json({
        status:'Success',
        appointments
    })
})

exports.registeredAppointments = catchAsync(async (req,res,next)=>{
    const appointments = await getRegisteredAppointments(req.user.id);
    res.status(200).json({
        status:"Success",
        appointments
    })
})