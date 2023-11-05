const mongoose = require('mongoose')


const appointmentSchema = new mongoose.Schema({

    sendBy:{
        type:String,
        required:true
    },
    
    
    scheduleAt:{
        type:Date,
        required:true,
    },
    students:[
        {
            studentId:{
                type:mongoose.Schema.ObjectId,
                unique:true,
                ref:"User"
                
            },
            approved:{
                type:Boolean,
                default:false
            }
        }
    ]

    
    
    

})

appointmentSchema.index({sendBy:1,scheduleAt:1},{unique:true});


   


module.exports = mongoose.model('Appointment',appointmentSchema)

