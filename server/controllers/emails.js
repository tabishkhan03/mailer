const authid=require('../models/authid')
const bcrypt=require('bcrypt');
const sendMail=require('./sendMail')
const crypto = require('crypto');
const axios=require('axios')

const encryptionKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);

const getemails=async(req,res)=>{

    let response;
    try {
        let emails=await authid.find()
        let allemail=emails.map((useremail)=>useremail.email)
        response=res.send(allemail)
        
    } catch (error) { 
        // if(error.code==11000){
        //     response=res.status(400).json({message:"Email already exist"})
        // }

        console.log("error is "+ error.code )
        response=res.status(400).json({message:"error fetching details"})
    }
     return response;
}

const addemail = async (req, res) => {
    const { userid, email, passkey } = req.body;
    let response;
    try {
        let hashedpass = cipher.update(passkey, 'utf-8', 'hex');
        hashedpass += cipher.final('hex');
        console.log('Encrypted:', hashedpass);
        const isemail = await authid.findOne({ email: email });
        if (isemail == null) {
            await authid.create({ email, passkey: hashedpass, userid });
            response = res.status(200).json({ message: "email added succesfully" });
        } else {
            response = res.status(400).json({ message: "Email already exist" });
        }
    } catch (error) {
        console.log("error is " + error);
        response = res.status(400).json({ message: "error in adding email " });
    }
    return response;
};
const getuseremail=async(req,res)=>{

    let response;
    try {
        let userid=req.params.userId
        let emails=await authid.find({userid:userid})
        let allemail=emails.map((useremail)=>({'emailId':useremail.email,'id':useremail._id}))
        response=res.send(allemail)
        
    } catch (error) { 

        console.log("error is "+ error.code )
        response=res.status(400).json({message:"error fetching details"})
    }
     return response;
}
const getEmailByEmailId=async(req,res)=>{

    let response;
    try {
        let emailid=await req.params.emailId
        let emails=await authid.find({ _id: emailid })
        console.log(emails)
        let allemail=emails.map((useremail)=>({'emailId':useremail.email,'userid':useremail.userid}))
        response=res.send(allemail)
        
    } catch (error) { 
        console.log("error is "+ error.code )
        response=res.status(400).json({message:"error fetching details"})
    }
     return response;
}

const scheduleMail=async(req,res)=>{

    let response;
    let status;
    try {
        let {senderEmail,receiverEmail,subject,body}= req.body;
        
        const emailData=await authid.findOne({email:senderEmail})

        response=await axios.post("http://localhost:5000/api/emails/sendEmail", {
            userId:emailData.userid,
            emailId:emailData._id,
            senderEmail:senderEmail,
            passKey:emailData.passkey,
            receiverEmail:receiverEmail,
            subject:subject,
            body:body
        })
        console.log(response);
        
    } catch (error) { 
        console.log("error is "+ error.code )
        response=res.status(400).json({message:"error fetching details"})
    }
     return response;

}




const getSentEmails=async(req,res)=>{

    let response;
    try {
        const userid=req.params.userId
        const emailid=req.params.emailId
        let emails=await authid.find({ userid: emailid },{ _id: emailid })
        console.log(emails)
        let allemail=emails.map((useremail)=>({'emailId':useremail.email,'userid':useremail.userid}))
        response=res.send(allemail)
        
    } catch (error) { 
        console.log("error is "+ error.code )
        response=res.status(400).json({message:"error fetching details"})
    }
     return response;
}

module.exports={
    "getUserEmail":getuseremail,
    "addEmail":addemail,
    "getEmails":getemails,
    "getEmailByEmailId":getEmailByEmailId,
    "scheduleMail":scheduleMail,
    "getSentEmails":getSentEmails
}


