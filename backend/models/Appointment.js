const mongoose = require('mongoose')


const appointmentSchema = new mongoose.Schema({

    sendBy: {
        type: String,
        required: true
    },
    name:{
        type:String,
        required:true
    },

    scheduleAt: {
        type: Date,
        required: true,
    },
    students: [
        {
            studentId: {
                type: mongoose.Schema.ObjectId,
                
                ref: "User"

            },
            approved: {
                type: Boolean,
                default: false
            }
        }
    ]





})

appointmentSchema.index({ sendBy: 1, scheduleAt: 1 }, { unique: true });
appointmentSchema.index(
    { "students.studentId": 1 },
    { partialFilterExpression: { "students.studentId": null }, unique: true }
);





module.exports = mongoose.model('Appointment', appointmentSchema)

