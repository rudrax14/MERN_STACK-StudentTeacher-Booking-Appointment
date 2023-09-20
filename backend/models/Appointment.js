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
        required:true,
    },
    status:{
        type:Boolean,
        default:false
    }

    
    
    

})

appointmentSchema.index({sendBy:1,sendTo:1,scheduleAt:1},{unique:true});


   


module.exports = mongoose.model('Appointment',appointmentSchema)

