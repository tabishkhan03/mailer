const mongoose=require('mongoose')
require('dotenv')

const dbConnectionUrl="mongodb+srv://tabish:nodemailer123@mailer.ozclylg.mongodb.net/mailer"

const connectToMongo=()=>{
    mongoose.connect(dbConnectionUrl,{ useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{console.log("database connected")})
    .catch((err)=>{console.log("database is not working "+err)})
}

module.exports=connectToMongo