const express=require('express')
const adduser=require('../controllers/users/adduser.js')
const email=require('../controllers/emails.js')
const sendEmail=require('../controllers/sendMail.js')
const getUsers = require('../controllers/users/getUsers.js');
// const getUser = require('../controllers/users/getUser.js');
// const editUser = require('../controllers/users/editUser.js');
const router=express.Router();

router.post('/user',adduser);
router.get('/users',getUsers);//reference


router.post('/send-mail',email.scheduleMail)
router.post('/emails',email.addEmail)
router.get('/emails',email.getEmails);//reference
router.get('/emails/user/:userId',email.getUserEmail)
router.get('/emails/:emailId',email.getEmailByEmailId )//confilicting with /emails/:userId so change it to emial/:emailId
router.get('/emails/scheduled/:userId/:emailId',email.getSentEmails)
router.get('/emails/sendEmail',sendEmail)

// router.get('/emails/:emailId', )

// router.get('/emails/scheduled/:userId/:emailId')

// router.post('/send-mail', scheduleMail)

// {
//     "userId":"asjdaksjd",
//     "email":"iashudianijnac",
//     'mailBody':{
//         'recieverMail':'xyz@gmail.com',
//         'subject':'asodjaosijdo'
//         'body':"oasdoasijdoiasjd",
//         'sheduleTime': null
//     }
// }

// // mail send
// {
//     senderEmail:abc@getMaxListeners.com
//     passKey: sadasdasdasd
//     'mailBody':{
//         'recieverMail':'xyz@gmail.com',
//         'subject':'asodjaosijdo'
//         'body':"oasdoasijdoiasjd",
//         'sheduleTime': null
//     }
// }

// userId, emailId, recieverMail, body, objectID

module.exports= router;

