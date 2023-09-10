const mongoose=require('mongoose')

const sent=new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'
    },
    emailId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'authids'
    },
    email:{
        type:String,
        required:true
    },
    mailBody:{
        recieverMail:{
            type:String,
            required:true
        },
        subject:{
            type:String,
            default:"subject"
        },
        body:{
            type:String,
            required:true
        }
    }
})

module.exports=mongoose.model('sents',sent);