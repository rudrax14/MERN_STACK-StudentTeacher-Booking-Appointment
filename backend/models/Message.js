const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    messageText:{
        type:String,
        required:true
    }
})

const Message = mongoose.model('Message',messageSchema)

module.exports = Message