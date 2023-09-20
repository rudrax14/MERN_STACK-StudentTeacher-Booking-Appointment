
const User = require("../models/User");
const Appointment = require("../models/Appointment");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require('../utils/sendEmail');

// Helper function to check if two appointment times clash
const checkTimeClash = (time1, time2) => {
    const timeDiff = Math.abs(new Date(time1) - new Date(time2));
    return timeDiff <= 1800000; // 30 minutes in milliseconds
};

// Helper function to retrieve appointments for a user within a specific date range
const getUserAppointments = async (email, startDate, endDate) => {
    return await Appointment.find({
        $or: [{ sendBy: email }, { sendTo: email }],
        status: true,
        scheduleAt: { $gte: startDate, $lt: endDate }
    });
};

exports.getAllAppointments = catchAsync(async (req, res) => {
    const appointments = await getUserAppointments(req.user.email, new Date(), new Date(9999, 11, 31));
    res.status(200).json({ appointments });
});

exports.createAppointment = catchAsync(async (req, res, next) => {
    const { sendBy, sendTo, reason } = req.body;
    const scheduleAt = new Date(2022, 10, 10, 2, 45, 20).toString(); // Replace with your desired date/time

    const teacherAppointments = await getUserAppointments(req.user.email, new Date(2022, 10, 10), new Date(2022, 10, 11));
    const studentAppointments = await getUserAppointments(req.body.sendTo, new Date(2022, 10, 10), new Date(2022, 10, 11));

    if (teacherAppointments.length >= 3) {
        return next(new AppError("Your schedule is packed"));
    }
    if (studentAppointments.length > 0) {
        return next(new AppError("Student's schedule is packed"));
    }

    const newAppointment = await Appointment.create({
        sendBy,
        sendTo,
        reason,
        scheduleAt,
        status: true
    });

    const message = `Appointment has been scheduled at ${newAppointment.scheduleAt}. Reason: ${newAppointment.reason}`;

    await sendEmail(sendBy, sendTo, "Appointment Booking", message);
    res.status(200).json({
        status: 'SUCCESS',
        data: { appointment: newAppointment }
    });
});

exports.approveAppointment = catchAsync(async (req, res) => {
    await Appointment.findByIdAndUpdate(req.params.id, { status: true });
    res.status(200).json({ message: "Approved" });
});

exports.deleteAppointment = catchAsync(async (req, res) => {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    const message = `Appointment has been cancelled`;
    await sendEmail(appointment.sendBy, req.body.mail, "Appointment Booking", message);
    res.status(200).json({ status: "SUCCESS", message: "Appointment deleted" });
});

exports.getAllStudents = catchAsync(async (req, res) => {
    const filter = { roles: "student", ...req.query };
    const students = await User.find(filter).collation({ locale: 'en', strength: 2 });
    res.status(200).json({ students });
});
