const user=require('../../models/users.js')
const bcrypt=require('bcrypt')

const adduser=async(req,res)=>{
    const {name,email,password}=req.body;
    let response;
    try {
        const hashedpass=await bcrypt.hash(password,10);
        await user.create({name,email,password:hashedpass})
        response=res.status(200).json({message:"signup succesfully"})
        
    } catch (error) { 
        if(error.code==11000){
            response=res.status(400).json({message:"Email already exist"})
        }
        console.log("error is "+ error.code )
        response=res.status(400).json({message:"error in signup "})
    }
     return response;
}

module.exports=adduser