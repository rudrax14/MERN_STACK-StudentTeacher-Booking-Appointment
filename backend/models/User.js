const mongoose=require('mongoose')
const bcrypt = require('bcrypt')
const AppError = require('../utils/AppError')
let crypto = require('crypto')
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email field is required"],
        unique:true,
        
    },
    name:{
        type:String,
        required:[true,"Name field is required"]
    },
    department:{
        type:String,
        required:[true,"Password field is required"]

    },
    subject:{
        type:Array,
        default:[]
    },
    age:{
        type:Number,
        required:true
    },
    roles:{
        type:String,
        required:true,
        default:"student"

},
password:{
    type:String,
    required:true
},
passwordConfirm:{
    type:String,
    required:true,
    validate:{
        validator: function (val){
            return this.password === val
        },
        message:"Password and password confirm field must have same values"
    }
},
appointments:[
    {
        type:mongoose.Schema.ObjectId,
        ref:"Appointment"
    }
    
]

})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next()
    }
    
       
    const hash = await bcrypt.hash(this.password,10)
    this.password=hash
    this.passwordConfirm=undefined

   
   next()

})
userSchema.pre('save',async function(next){
   if(this.id==='63bb0fa50df0b831f34e98a6') return next()
   if(this.roles==='admin') return next(new AppError('You are not the admin'))
   next()

})



const User = mongoose.model('User',userSchema)
module.exports = User