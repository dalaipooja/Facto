const Admin = require('../models/adminModel');
const User = require('../models/registerModel');
const sentEmail = require('../models/email')
const vacancy = require('../models/vacancyModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const securePassword = async(password)=>{
    try {
      const passwordHash = await bcrypt.hash(password,10);
      return passwordHash;  
    } catch (error) {
        console.log(error.message); 
    }
}

const adminLogin = async(req,res)=>{
    try {
        res.render("adminlogin.ejs");
    } catch (error) {
       console.log(error.message); 
    }
}

const insertAdmin = async(req,res)=>{
    try {
    const spassword = await securePassword(req.body.password);
    const admindetails = new Admin({
     email:req.body.email,
     password:spassword
    })
    const adminData = await admindetails.save();
    if(adminData){
        res.render('adminControl.ejs')
    }
    else{
        res.render('adminlogin.ejs',{message: "Incorrect email or password"})
    }
    } catch (error) {
        console.log(error.message); 
    }
}

const verifyAdminLogin = async(req,res)=>{
    try {
        const email = req.body.email;
        // const vacpass = await vacancy.find({password});
        const password = req.body.password;
        
        const adminData = await Admin.findOne({email:email});
        if(adminData){
            // const passwordMatch = bcrypt.compare(password, adminData.password);

            // if(passwordMatch){
             res.render("adminControl.ejs");
            // }
            // else {
            //     res.render("adminlogin",{message:"Incorrect Email or Password"});
            // }
        }
        else{
            res.render("adminlogin",{message:"Incorrect Email or Password"});  
        }
    } catch (error) {
        console.log(error.message);
    }
}

const loadAddvac = async(req,res)=>{

   try {
    res.render("addvacancy.ejs");
   } catch (error) {
    console.log(error.message);
   }
}
const addVacancy = async(req,res)=>{
    try {
    const vacdetails = new vacancy({
        vacancyname: req.body.job,
        qualification : req.body.qualification,
        stream: req.body.stream,
        experience: req.body.experience,
        // salary: req.body.salary
 })
   const vacData = await vacdetails.save();
   if(vacData){
    res.render("addvacancy",{message:"Data Inserted Successfully !"});
   } 
   else{
    console.log(error.message);
   }

    } catch (error) {
        console.log(error.message); 
    }
}

const viewvacancypage = async(req,res)=>{
    try {
      const vacnacyData = await vacancy.find({__v:0}) 
       res.render("viewvacanciesdet",{vacancy:vacnacyData});  
    } catch (error) {
        console.log(error.message);
    }
}

const viewuserDetailspage = async(req,res)=>{
    try {
        const userData = await User.find({__v:0});
        res.render("viewuserdetails.ejs",{User:userData});
    } catch (error) {
        console.log(error.message); 
    }
}

const Dashboardpage = async(req,res)=>
{

    try {
        res.render("adminControl.ejs");
    } catch (error) {
        console.log(error.message);  
    }

}

const editvac = async(req,res)=>
{
        try {
        const id = req.query.id;
        const vacData = await vacancy.findById({_id:id});
        if(vacData){
            res.render("editvac.ejs",{vacancy:vacData});
        }
        else

        {
            console.log(error.message);
            // res.render("admincontrol.ejs");
        }
        // res.render("editvac.ejs");
    } catch (error) {
        console.log(error.message);  
    }

}

const editvacLoad = async(req,res)=>{
    try {
        const vacnacyData = await vacancy.find({__v:0}) 
        
        res.render("editvacancy.ejs",{vacancy:vacnacyData}); 
    } catch (error) {
        console.log(error.message);  
    }
}

const updateVac = async(req,res)=>{

    try {
    
    const vacData = await vacancy.findByIdAndUpdate({_id: req.body.id}, {$set:{vacancyname:req.body.job, qualification:req.body.qualification, stream:req.body.stream , experience:req.body.experience}})
    res.redirect('/editvacancy')    
    } catch (error) {
        console.log(error.message);  
    }
}

const deleteVac = async(req,res)=>{

     try {
        const id = req.query.id;
        const vacData = await vacancy.deleteOne({_id:id});
        res.redirect('/editvacancy')   
     } catch (error) {
        console.log(error.message);    
     }
}

const signupadmin = async(req,res)=>
{

    try {
        res.render("test.ejs");
    } catch (error) {
        console.log(error.message);  
    }

}

const sendEmailData = async(req,res)=>{
    try {
       res.render("sendemail") 
    } catch (error) {
      console.log(error.message);  
    }
}

const insertEmailData= async(req,res)=>{

        try {  
           
            const sendemail = new sentEmail({
            subject: req.body.subject,
            message: req.body.message,
            })   
            
            const userData = await sendemail.save();
            if(userData){
                res.render("sendemail",{message:"Click on the sent email button to sent email"});
    
            }
            else{
                console.log(error.message);   
            }
        } catch (error) {
                console.log(error);    
        }
    
    }

    const laodtest =async(req,res)=>{
        try {
            res.redirect('launchtest')  
        } catch (error) {
            console.log(error);
        }
       
    }

module.exports = {
    adminLogin,
    verifyAdminLogin,
    loadAddvac,
    addVacancy,
    viewvacancypage,
    viewuserDetailspage,
    Dashboardpage,
    editvac,
    editvacLoad,
    updateVac,
    deleteVac,
    signupadmin,
    insertAdmin,
    sendEmailData,
    insertEmailData,
    laodtest
}