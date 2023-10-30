const User = require('../models/User');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const sendEmail = require('../utils/sendEmail');


exports.setRole = function (role) {
  
  return (req, res, next) => {
    
    req.body.roles = role;
    next();
  };
};

const oneTimePasswordCreator = () => {
  let password = crypto.randomBytes(32).toString('hex');
  return password;
};

const filterObj = (obj) => {
  const newObj = {};
  const notAllowed = ['email', 'roles'];
  Object.keys(obj).forEach((el) => {
    if (!notAllowed.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.allow = (...roles) => {
  return (req, res, next) => {
    
    if (roles.includes(req.user.role)) {
      next();
    } else {
      next(new AppError('Admin-only access', 401));
    }
  };
};

exports.createTeacher = catchAsync(async (req, res, next) => {
  
  
  
  const user = {
    email: req.body.email,
    name: req.body.name,
    department: req.body.department,
    subject: req.body.subject,
    age: req.body.age,
    roles: req.body.roles,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  };

  const newUser = await User.create(user);
  /* await sendEmail(
    newUser.email,
    'Password created', 
    `This is an auto-generated password. You can create your own password after logging in: ${password}`
  ); */

  return res.status(200).json({
    status: 'SUCCESS',
    data: {
      newUser,
    },
  });
});

exports.getAllTeachers = catchAsync(async (req, res, next) => {
  const users = await User.find({roles:'teacher'}).populate('appointments');

  res.status(200).json({
    status: 'SUCCESS',
    data: {
      users,
    },
  });
});

exports.getTeacher = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    status: 'SUCCESS',
    data: {
      user,
    },
  });
});

exports.updateTeacher = catchAsync(async (req, res, next) => {
  const updateObj = filterObj(req.body);
  const user = await User.findByIdAndUpdate(req.params.id, updateObj, { new: true });

  res.status(200).json({
    status: 'SUCCESS',
    data: {
      user,
    },
  });
});

exports.deleteTeacher = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: 'SUCCESS',
    message: 'User deleted',
  });
});

exports.approveStudent = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.params.id, { admissionStatus: true }, { where: { roles: 'student' } });

  res.status(200).json({
    message: 'Student Approved',
  });
});

exports.deleteStudent = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: 'SUCCESS',
    message: 'Student deleted',
  });
});