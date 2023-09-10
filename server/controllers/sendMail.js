const sent = require("../models/sent");
const nodemailer = require("nodemailer");
const crypto=require('crypto')


const encryptionKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);

const sendEmail = async (req, res) => {
  try {
     let {
        userId,
        emailId,
        senderEmail,
        passKey,
        receiverEmail, 
        subject,
        body
    }= await req.body;
    let decryptedPassKey = decipher.update(passKey, 'hex', 'utf-8');
    decryptedPassKey+= decipher.final('utf-8');
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: senderEmail,
        pass: decryptedPassKey,
      },
      debug: true,
    });

    const mailOptions = {
      from: senderEmail,
      to: receiverEmail,
      subject: subject,
      text: body,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log("Error:", error);
        return res
          .status(400)
          .json({ message: "Email not sent!", error: error });
      } else {
        console.log("Email sent successfully!");

        const details = {
          userId: userId,
          emailId: emailId,
          email: senderEmail,
          mailBody: {
            recieverMail: receiverEmail,
            subject: subject,
            body: body,
          },
        };

        console.log("Details:", details);

        await sent.create(details);

        return res.status(200).json({ message: "Email sent successfully!" });
      }
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: "Error sending email." });
  }
};

module.exports = sendEmail;
