const mongoose = require('mongoose')


mongoose.connect('mongodb+srv://admin:password%40123@cluster0.ll9fdog.mongodb.net/')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
    
    },
    firstName:{
        type:String,
        required:true
    },
    lastName: {
        type: String,
        required: true
    }

})

const accountSchema= new mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance:{
        type: Number,
        required: true
    }
})

const User= mongoose.model("User", userSchema)
const Account= mongoose.model('Account', accountSchema)

module.exports={
    User,
    Account
}