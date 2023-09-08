const User = require("../models/User");
const AppError = require("../utils/AppError");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const catchAsync = require("../utils/catchAsync");
const util = require('util');
const Appointment = require("../models/Appointment");
/* const signToken = async (id,role)=>{
    return await jwt.sign({id,role},process.env.JWT_KEY,{
        expiresIn:'90d'
    })
}
 */
/* exports.verifyToken = catchAsync(async (req,res,next)=>{
    
    let token=''
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        token=req.headers.authorization.split(' ')[1]
        
    }
    
    if(!token){
        return next(new AppError('You are not logged in to gain access'))
    }

    console.log(token)
    const decoded = await util.promisify(jwt.verify)(token,process.env.JWT_KEY)
    req.user = decoded
    console.log(decoded)
    next()
    
})
 */
/* const verifyPassword = async (candidatepassword,userPassword)=>{
    
    return await bcrypt.compare(candidatepassword,userPassword)
} */
/* exports.login = catchAsync(async (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    if(!email || !password){
        return next(new AppError('Cannot leave email id or password field blank'))
    }
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return next(new AppError('User not found'))
    }
    const verify = await verifyPassword(password,user.password)
    if(!verify){
        return next(new AppError('Enter the correct password'))
    }
    const token = await signToken(user._id,user.roles)
    
    
    res.status(201).json({
        status:'SUCCESS',
        message:"Login successful",
        data:{
            user
        },
        token
    })
}) */

/* exports.updatePassword =async (req,res,next)=>{
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    const newPasswordConfirm = req.body.newPasswordConfirm;

    const user = await User.findById(req.user.id)
    console.log(user)
    if(!(await verifyPassword(password,user.password))){
        return next(new AppError('Enter correct password'))
    }
    user.password = newPassword;
    user.passwordConfirm = newPasswordConfirm;
    user.save({runValidators:true})
    res.status(201).json({
        status:"SUCCESS",
        message:"Password changed"
    })

}

 */


exports.createAppointment = catchAsync( async (req,res,next)=>{
    /* console.log(new Date(2022,10,10,6,13,12,0).toString())
    const pastAppointment = await Appointment.find().sort( { createdAt:-1 } ).limit(1) */


    const appointment = {
        sendBy:req.body.sendBy,
        sendTo:req.body.sendTo,
        reason:req.body.reason,
        scheduleAt:new Date(2022,10,10,6,13,12,0).toString(),
        status:true
    }
    /* const newAppointment = await Appointment.create(appointment)
    const newUserId = await User.findByIdAndUpdate(req.user.id,{
        $push:{
            appointments:newAppointment._id
        } 
    }) */
    res.status(200).json({
        status:'SUCCESS',
        data:{
            appointment
        }
    })
})

exports.deleteAppointment = catchAsync(async (req,res,next)=>{
    const appointment = await Appointment.findByIdAndDelete(req.params.id)
    await User.findByIdAndUpdate(req.user.id,{$pull:{appointments:appointment._id}})
    res.status(200).json({
        status:"SUCCESS",
        message:"Appointment deleted",
    })
})