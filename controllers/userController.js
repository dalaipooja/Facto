const User = require('../models/userModel.js');
const vacancy = require('../models/vacancyModel.js');
const UserRegister = require('../models/registerModel.js');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");


const homepage = async(req,res)=>{
    try {
      res.render("home.ejs");
    } catch (error) {
        console.log(error.messgae);
    }
}

const aboutpage = async(req,res)=>{
    try {
      res.render("about.ejs");
    } catch (error) {
        console.log(error.messgae);
    }
}

const contactpage = async(req,res)=>{
    try {
      res.render("contact.ejs");
    } catch (error) {
        console.log(error.messgae);
    }
}

const uservacancypage = async(req,res)=>{
    try {
      const vacnacyData = await vacancy.find({__v:0}) 
       res.render("user",{vacancy:vacnacyData});  
    } catch (error) {
        console.log(error.message);
    }
}

const loginsignup = async(req,res)=>{
    try {
       res.render("loginsignup.ejs") 
    } catch (error) {
        console.log(error.messgae);
    }
}

const loginpage = async(req,res)=>{
    try {
        res.render("loginsignup.ejs") 
    } catch (error) {
        console.log(error.messgae); 
    }
}

const applyvacancypage = async(req,res)=>{
    try {
        res.render("applyvacancy");
    } catch (error) {
        console.log(error.messgae); 
    }
}

const eventspage = async(req,res)=>{
    try {
        res.render("events");
    } catch (error) {
        console.log(error.messgae); 
    }
}

const securePassword= async(password)=>{
    try {
        const passwordHash = await bcrypt.hash(password,10);
        return passwordHash;

    } catch (error) {
       console.log(error.messgae); 
    }
}


const Usersignup = async(req,res)=>{
    try {
        const spassword = await securePassword(req.body.password);   
        const SignupData = new User({
        name: req.body.name,
        email: req.body.email,
        password: spassword
        })   

        const userData = await SignupData.save();
        if(userData){
            const vacnacyData = await vacancy.find({__v:0}) 
            res.render("applyvacancy",{vacancy:vacnacyData});
            res.render("applyvacancy.ejs");
        }
        else{
            console.log(error.messgae);
        }
    } catch (error) {
            console.log(error);    
    }

}

const verifyLogin = async(req,res)=>{
    try {
    const email = req.body.email;
    const password = req.body.password;
    
    const userData = await User.findOne({email:email});
    if(userData){
     
    const passwordMatch = bcrypt.compare(password,userData.password);
    if(passwordMatch){
        const vacnacyData = await vacancy.find({__v:0}) 
        res.render("applyvacancy",{vacancy:vacnacyData});
    }
    else{
        res.render('loginsignup',{message:"Incorrect Email or Password"})  
    }
}else{
        res.render('loginsignup',{message:"Incorrect Email or Password"}) 
    }
    
    } catch (error) {
        console.log(error.message);
    }
}

const sendRegistrationMail = async(name,email,user_id)=>{
    try {
        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:'abc@gmail.com',
                pass:'1234'
            }
        });

        const mailOptions = {
            from:'abc@gmail.com',
            to:email,
            subject:'Welcome to Facto!',
            html:'<p>Welcome to Facto,'+name+ '!</p> <br>Dear Participants,<br> Greetings from CSIT ACROPOLIS ! <br><br> We are delighted to confirm your registration has been successfully accomplished<hr> Dont forget to Check your mail for further process</p>'
        }
        // Your registration has been successfully accomplished

        transporter.sendMail(mailOptions, function(error,info){
            if(error){
                console.log(error);
            }else{
                console.log("Email has been sent-", info.response);
            }
        });
    } catch (error) {
        console.log(error.message);
    }

}

const registrationpage = async(req,res)=>{
    try {
     res.render("registration"); 
    } catch (error) {
       console.log(error.message); 
    }
}

const insertRegistrationdetails = async(req,res)=>{
    try {
    const details = new UserRegister({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        image:req.body.image,
        phoneno: req.body.number,
        dob: req.body.dob,
        gender: req.body.gender,
        degree: req.body.degree,
        college: req.body.college,
        year: req.body.year,
        report: req.body.report,
        grade: req.body.grade,
        specialization: req.body.area,
        experience: req.body.experience,
        linkedinaccount: req.body.ln,
        resume: req.body.resume,
   });

   const registerdetails = await details.save();
   if(registerdetails){
    sendRegistrationMail(req.body.name,req.body.email,registerdetails._id);
    res.render("thanks.ejs")
   }else{
    const email = req.body.email;
    const userData=  await User.findOne({email:email});
    if(userData){
        res.render("thanks.ejs")
    }
    else{
        res.render('registration',{message:"Email is incorrect"}); 
    }
   }
    } catch (error) {
       console.log(error.message); 
    }

}


module.exports={
    homepage,
    aboutpage,
    contactpage,
    uservacancypage,
    loginsignup,
    loginpage,
    applyvacancypage,
    Usersignup,
    verifyLogin,
    registrationpage,
    insertRegistrationdetails,
    eventspage
}