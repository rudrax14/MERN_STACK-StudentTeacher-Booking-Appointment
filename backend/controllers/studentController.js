const User = require('../models/User')
const catchAsync = require('../utils/catchAsync');
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
