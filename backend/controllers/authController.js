const User = require("../models/User");
const AppError = require("../utils/AppError");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const catchAsync = require("../utils/catchAsync");
const util = require('util');
const { decode } = require("punycode");

const verifyPassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const signToken = async (id, role, name ,email,admissionStatus) => {
  return await jwt.sign({ id, role, name,email,admissionStatus }, process.env.JWT_KEY, {
    expiresIn: '90d'
  });
};

exports.signToken = signToken;

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Cannot leave email or password field blank'));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError('User not found'));
  }

  const isPasswordValid = await verifyPassword(password, user.password);

  if (!isPasswordValid) {
    return next(new AppError('Enter the correct password'));
  }

  const token = await signToken(user._id, user.roles, user.name ,user.email,user.admissionStatus);
  
  res.status(201).json({
    status: 'SUCCESS',
    message: "Login successful",
    data: { user },
    token
  });
});

exports.updatePassword = async (req, res, next) => {
  const { password, newPassword, newPasswordConfirm } = req.body;

  const user = await User.findById(req.user.id);

  if (!(await verifyPassword(password, user.password))) {
    return next(new AppError('Enter correct password'));
  }

  user.password = newPassword;
  user.passwordConfirm = newPasswordConfirm;
  user.save({ runValidators: true });

  res.status(201).json({
    status: "SUCCESS",
    message: "Password changed"
  });
};

exports.verifyToken = catchAsync(async (req, res, next) => {
  let token = '';

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in to gain access'));
  }

  const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_KEY);
  
  req.user = decoded;

  next();
});
