const express = require("express");
const user_route =express();

user_route.set('view engine','ejs');
user_route.set('views','./views/users');

const bodyParser = require("body-parser");
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination:function(req,file,cb){
     cb(null,path.join(__dirname,'../public/userImages'));
    },
    filename:function(req,file,cb){
     const name = Date.now()+'-'+file.originalname;
     cb(null,name);
    }
});

const upload = multer({storage: storage});

const UserController = require('../controllers/userController');

user_route.get('/',UserController.homepage);

user_route.get('/home',UserController.homepage);

user_route.get('/about',UserController.aboutpage);

user_route.get('/contact',UserController.contactpage);

user_route.get('/vacancy',UserController.uservacancypage);

user_route.get('/logsign',UserController.loginsignup);

user_route.get('/login',UserController.loginpage);

user_route.post('/login',UserController.verifyLogin);

user_route.post('/signup',UserController.Usersignup);

user_route.get('/applynow',UserController.registrationpage);

user_route.get('/applyvacancy',UserController.registrationpage);

user_route.get('/courses',UserController.eventspage);

user_route.post('/applyvacancy', upload.array('image'),UserController.insertRegistrationdetails);

// user_route.get('/admin',UserController.adminpage);

module.exports = user_route;