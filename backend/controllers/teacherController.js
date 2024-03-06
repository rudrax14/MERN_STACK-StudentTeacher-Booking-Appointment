
const User = require("../models/User");
const Appointment = require("../models/Appointment");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { connect } = require('../utils/sendEmail');
const transporter = connect()

// Helper function to check if two appointment times clash
const checkTimeClash = (time1, time2) => {
    const timeDiff = Math.abs(new Date(time1) - new Date(time2));
    return timeDiff <= 7200000; // 120 minutes in milliseconds
};

// Helper function to retrieve appointments for a user within a specific date range
const getUserAppointments = async (email, startDate, endDate) => {
    return await Appointment.find({
        sendBy: email,

        scheduleAt: { $gte: startDate, $lt: endDate }
    });
};

exports.getAllPendingStudents = catchAsync(async (req, res, next) => {
    const students = await Appointment.find({ sendBy: req.user.email, "students.approved": false }).populate({ path: "students.studentId", select: "_id name department email" }).select("-students.approved -students._id -sendBy");

    res.status(200).json({
        status: "Success",
        students
    })
})

exports.getAllAppointments = catchAsync(async (req, res) => {
    const appointments = await Appointment.find({ sendBy: req.user.email });
    res.status(200).json({ appointments });
});




exports.createAppointment = catchAsync(async (req, res, next) => {

    const sendBy = req.user.email;
    const name = req.user.name;
    //const scheduleAt = new Date(2022, 10, 10, 14, 0, 0).toString(); // Replace with your desired date/time

    const scheduleAt = req.body.scheduleAt;


    const newAppointment = await Appointment.create({ sendBy, name, scheduleAt })
    await User.findOneAndUpdate({ _id: req.user.id }, { $push: { appointments: newAppointment._id } })
    res.status(200).json({
        newAppointment
    })

});

exports.approveAppointment = catchAsync(async (req, res) => {
    const appointment = await Appointment.findOneAndUpdate({ _id: req.params.id, "students.studentId": req.params.studentId }, {
        $set: {
            'students.$.approved': true // Set the 'approved' field to true for the matched student
        }
    });
    // const studentEmail = await User.findById(req.params.studentId).select('email')
    // console.log(studentEmail)
    // const message = "your appointment is approved"

    // let info = await transporter.sendMail({from:req.user.email,to:studentEmail.email,subject:"Book appointment",body:message})

    const studentEmail = await User.findById(req.params.studentId).select('email');
    console.log(studentEmail)
    let info = await transporter.sendMail({
        from: '"tutor-time@brevo.com',
        to: studentEmail.email,
        subject: "Appointment Accepted",
        html: `
            <h2>Dear Student,</h2>
            <p>We are pleased to inform you that your appointment request has been successfully accepted by the teacher.</p>
            <p>Please make sure to join the session on time. If you have any questions or concerns, feel free to contact us.</p>
            <p>Thank you for using Tutor-Time, and we hope you have a productive session!</p>
            <p>Best regards,</p>
            <p>Tutor-Time</p>
            <p>Visit our website</p>

    `,
    });







    res.status(200).json({ message: "Approved" });
});

exports.dissapproveAppointment = catchAsync(async (req, res) => {
    const appointment = await Appointment.findOneAndUpdate({ _id: req.params.id }, {
        $pull: {
            'students': { 'studentId': req.params.studentId }
        }
    });
    // const studentEmail = await User.findById(req.params.studentId).select('email')
    // console.log(studentEmail)
    // const message = "Your appointment is not approved"
    // let info = await transporter.sendMail({from:req.user.email,to:studentEmail.email,subject:"Book appointment",body:message})

    const studentEmail = await User.findById(req.params.studentId).select('email');
    console.log(studentEmail)
    let info = await transporter.sendMail({
        from: "abutalhasheikh33@gmail.com",
        to: studentEmail.email,
        subject: "Appointment Rejected",
        html: `
        <h2>Dear Student,</h2>
        <p>We regret to inform you that your appointment request has been rejected by the teacher.</p>
        <p>If you have any questions or concerns, please reach out to us for further assistance.</p>
        <p>Thank you for using Tutor-Time, and we hope you understand the situation.</p>
        <p>Best regards,</p>
        <p>Tutor-Time</p>
        <p>Visit our website</p>

    `,
    });

    res.status(200).json({ message: "Student rejected" });
});

exports.deleteAppointment = catchAsync(async (req, res) => {
    await Appointment.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate(req.user.id, { $pull: { 'appointments': req.params.id } })
    const message = `Appointment has been cancelled`;
    //await sendEmail(appointment.sendBy, req.body.mail, "Appointment Booking", message);
    res.status(200).json({ status: "SUCCESS", message: "Appointment deleted" });
});

exports.getAllStudents = catchAsync(async (req, res) => {
    const filter = { roles: "student", ...req.query };
    const students = await User.find(filter).collation({ locale: 'en', strength: 2 });
    res.status(200).json({ students });
});
