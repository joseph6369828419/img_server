const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const multer = require('multer');
const path=require("path")

const upload = multer({ dest: './uploads/' });

app.use(express.json());




app.get("/",function(req,res){
    res.sendFile(path.join(__dirname+"/img_server.html"))
    
  })
  

app.post('/send-email', upload.single('file'), (req, res) => {
    const email = req.body.email;
    const file = req.file;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'infotech6369@gmail.com',
            pass: 'pfuaytvmyoxqpjak',
        },
    });
    const mailOptions = {
        from: 'joseph12108@gmail.com',
        to: email,
        subject: 'Email with File Attachment',
        text: 'Please find the attached file.',
        attachments: [
            {
                filename: file.originalname,
                path: file.path,
            },
        ],
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.json({ success: false, error: error.message });
        } else {
            res.json({ success: true });
        }
    });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
