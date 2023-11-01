const Message = require('../models/Message');
const catchAsync = require('../utils/catchAsync');

exports.sendMessage = catchAsync(async (req, res, next) => {
  const messageObj = {
    to: req.body.to,
    from: req.user.email,
    messageText: req.body.messageText,
  };

  const { messageText } = await Message.create(messageObj);

  res.status(200).json({
    messageText,
  });
});

exports.getAllMessages = catchAsync(async (req, res, next) => {
  const { email } = req.query;
  const { user } = req;

  const messages = await Message.find({ from: email, to: user.email });

  res.status(200).json({
    messages,
  });
});
