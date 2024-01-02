const User = require('./models/registerModel');
const sentEmail = require('./models/email')
const config = require('./config/config');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

const sendMailToAllUsers = async(emailObj)=>{
    // var message=sentEmail.find({message}.sort({_id:-1}).limit(1));
    // var subject=sentEmail.find({subject}.sort({_id:-1}).limit(1));
   const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:'poojadalai20704@acropolis.in',
                pass:'acro1234'
            }
    })
    // var url = <a href="tests.mettl.com/authenticateKey/5ls8j2g2rk"></a>
    const mailOptions ={
        form:'Facto',
        to:emailObj,
        subject:"Link for Online test",

        html:'<p>Hello user! <br> <strong>Level 1</strong> of your recruitment starts now.<hr> The test link has been sent. Please attend the test to proceed further for the assigment.<br>Note: Please DON’T take the ASSESSMENT from mobile phone (Android will not be supported). You will not be allowed to take this test from your mobile.  <br> Assessment can be taken anytime during the day. No specific DATE or TIME. However, Live chat support will be available only from 9.30 AM to 5.30 PM. In case you face any technical challenges or still have questions and/or clarifications, please reach out through Live Chat, available on the Login Page, for immediate assistance. In case you want to take the Assessment again after correcting some issues, you can do so.<hr></p> Link to join the test<a href="https://tests.mettl.com/authenticateKey/5lu6mvury8">Click Here</a>'

    }
    transporter.sendMail(mailOptions, function(error, info){
        if(error)
        console.log(error);
        else
        console.log('Mail has been sent', info.response);
    });
}

const sendMailAllUser = ()=>{
    try {

        // InsertEmail();
        cron.schedule('* * * * * ',async function(){
          var userDatac =  await User.find({});
        //   var subject = await sentEmail.find({subject}.sort({_id:-1}).limit(1));
        //   var message = await sentEmail.find({message}.sort({_id:-1}).limit(1));
          if(userDatac.length >0){
            var emails = [];
            userDatac.map((key)=>{
                emails.push(key.email);
            });
            
            sendMailToAllUsers(emails);
          }
        })
    } catch (error) {
       console.log(error.message); 
    }
}



// const InsertEmail = async(req,res)=>{
//     try {  
       
//         const sendemail = new sentEmail({
//         subject: req.body.subject,
//         message: req.body.message,
//         })   
       
        // const userData = await sendemail.save();
        // if(userData){
        //     // res.render("sendemail",{message:"Click on the sent email button to sent email"});

        // }
        // else{
        //     console.log(error.message);   
        // }

//     } catch (error) {
//             console.log(error);    
//     }

// }

const loadEmailpage = async(req,res)=>{

    try {
        res.render("sendemail"); 
    } catch (error) {
       console.log(error); 
    }
    
}
module.exports ={
    sendMailAllUser

}
