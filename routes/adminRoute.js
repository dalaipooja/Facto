const express = require("express");
const admin_route = express();

admin_route.set('view engine','ejs');
admin_route.set('views','./views/admin');

const bodyParser = require('body-parser');
admin_route.use(bodyParser.json());
admin_route.use(bodyParser.urlencoded({extended:true}));

const adminController = require('../controllers/adminController');

admin_route.get('/admin',adminController.adminLogin);

admin_route.post('/admin',adminController.verifyAdminLogin);

admin_route.post('/addvacancy',adminController.addVacancy);

admin_route.get('/addvacancy',adminController.loadAddvac);

admin_route.get('/viewvacancy',adminController.viewvacancypage);

admin_route.get('/editvacancy',adminController.editvacLoad);

admin_route.get('/viewuserdetails',adminController.viewuserDetailspage);

admin_route.get('/dashboard',adminController.Dashboardpage);

admin_route.get('/adminedit-vac',adminController.editvac);

admin_route.post('/adminedit-vac',adminController.updateVac);

admin_route.get('/admindelete-vac',adminController.deleteVac);

admin_route.get('/signupadmin',adminController.signupadmin);

admin_route.post('/signupadmin',adminController.insertAdmin);

admin_route.get('/sendEmail',adminController.sendEmailData);

admin_route.post('/sendEmail',adminController.insertEmailData);

// admin_route.get('/launch',adminController.laodtest);

module.exports = admin_route;