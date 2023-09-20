const User = require('../models/User')
const catchAsync = require('../utils/catchAsync');
const sendEmail = require('../utils/sendEmail');
const { signToken } = require('./authController');

exports.register = catchAsync(
   async (req,res,next)=>{
    const user = {
        email:req.body.email,
        name:req.body.name,
        password:req.body.password,
        passwordConfirm:req.body.passwordConfirm,
        department:req.body.department,
        age:req.body.age
    }
    const newUser =  await User.create(user);
    newUser.password = undefined
    const token = await signToken(newUser._id,newUser.roles)
    res.status(200).json({
        status:'SUCCESS',
        message:"Student created",
        data:{
            newUser
        },
        token
    }) 
    }
)

exports.createAppointment = catchAsync( async (req,res,next)=>{
    
    
    
    
    

    const appointment = {
        sendBy:req.body.sendBy,
        sendTo:req.body.sendTo,
        reason:req.body.reason,
        scheduleAt:new Date(2022,10,10,7,42,11).toString(),
        status:false
    }
    
            
  const newAppointment = await Appointment.create(appointment)

    const message = `I like to book an appointment on ${newAppointment.scheduleAt}. Reason:${newAppointment.reason}`
    await sendEmail(req.body.sendBy,req.body.sendTo,"Appointment Booking",message) 
    res.status(200).json({
        status:'SUCCESS',   
        data:{
            appointment
        }
    })
})
