const mongoose = require("mongoose");
const session = require("express-session");
mongoose.connect("mongodb://127.0.0.1:27017/frs");
// const { sendEmail } = require("./");

const express = require("express");
const app = express();

app.use(express.static(__dirname + "/views"));


app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.set('view engine','ejs');
app.set('views','./views/admin');

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


const customcrone = require('./crone');

customcrone.sendMailAllUser();

const userRoute = require('./routes/userRoute');
app.use('/',userRoute);

const adminRoute = require('./routes/adminRoute');
app.use('/',adminRoute);

app.listen(3005,function(){
    console.log("Connection successful");
});
