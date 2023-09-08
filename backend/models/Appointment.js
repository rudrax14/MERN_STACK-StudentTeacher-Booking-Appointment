const mongoose = require('mongoose')


const appointmentSchema = new mongoose.Schema({

    sendBy:{
        type:String,
        required:true
    },
    sendTo:{
        type:String,
        required:true,
    },
    reason:{
        type:String,
        required:true
    },
    scheduleAt:{
        type:Date,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    }
    
    

})



module.exports = mongoose.model('Appointment',appointmentSchema)

