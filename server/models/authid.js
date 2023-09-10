const mongoose=require('mongoose')

const authid=new mongoose.Schema({
    email:{
        type:String
    },
    passkey:{
        type:String
    },
    userid:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'
    }
    

})

module.exports=mongoose.model('authids',authid);