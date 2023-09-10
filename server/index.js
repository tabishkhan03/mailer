const express=require('express')
const connectToMongo=require('./db')
const user=require('./routes/user.js')
const cors = require('cors');

connectToMongo()

const app=express()
app.use(express.json())
app.use(cors());
const port=4000;

app.use('/api',user)

app.listen(port,()=>{
    try {
        console.log("server is running on port "+port)
    } catch (error) {
        console.log("server is not working "+error)
    }
}) 